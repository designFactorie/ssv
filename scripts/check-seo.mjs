// Read-only checks of the actual server-rendered pages. No Google credentials needed.
import assert from 'node:assert/strict';

const origin = new URL(process.argv[2] || 'http://localhost:3000').origin;
const production = 'https://www.sairamsanskruthividhyalaya.com';
const paths = ['/', '/about', '/programs', '/gallery', '/contact'];
const titles = new Set();
const descriptions = new Set();
const imageUrls = new Set();
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], decode(match[2])]));

async function get(path) {
  return fetch(new URL(path, origin), { signal: AbortSignal.timeout(30000) });
}

try {
  for (const path of paths) {
    const response = await get(path);
    assert.equal(response.status, 200, `${path}: must return HTTP 200`);
    assert(!response.headers.get('x-robots-tag')?.includes('noindex'), `${path}: X-Robots-Tag must permit indexing`);
    const html = await response.text();
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map(match => attributes(match[0]));
    const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => attributes(match[0]));
    const value = name => meta.find(tag => tag.name === name || tag.property === name)?.content;
    const canonical = links.filter(link => link.rel === 'canonical');
    assert.equal(canonical.length, 1, `${path}: exactly one canonical required`);
    assert.equal(new URL(canonical[0].href).href, new URL(path, production).href, `${path}: canonical must point to this page`);
    const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
    assert(title && !titles.has(title), `${path}: unique title required`);
    assert.equal(title.split('Sairam Sanskruthi Vidhyalaya').length - 1, 1, `${path}: school name must appear once in title`);
    titles.add(title);
    const description = value('description');
    assert(description && !descriptions.has(description), `${path}: unique description required`);
    descriptions.add(description);
    assert.equal(new URL(value('og:url')).href, new URL(canonical[0].href).href, `${path}: sharing URL must match canonical`);
    assert.equal(value('og:title'), title, `${path}: Open Graph title must match title`);
    assert.equal(value('twitter:title'), title, `${path}: Twitter title must match title`);
    assert.equal(value('twitter:card'), 'summary_large_image');
    assert(value('og:image') && value('twitter:image'), `${path}: social images required`);
    assert.equal(value('og:image:width'), '1200');
    assert.equal(value('og:image:height'), '630');
    imageUrls.add(value('og:image'));
    imageUrls.add(value('twitter:image'));
    assert(!value('robots')?.includes('noindex'), `${path}: page must permit indexing`);
    const headings = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)];
    assert.equal(headings.length, 1, `${path}: one main heading required`);
    assert(!/opacity:\s*0(?:;|")/.test(headings[0][0]), `${path}: main heading must not be hidden before JavaScript`);
    const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
    const school = schemas.flatMap(schema => schema['@graph'] || [schema]).find(schema => schema['@type'] === 'Preschool');
    assert(school && school.telephone === '+919876543210', `${path}: school identity missing`);
    assert(!school.aggregateRating, `${path}: exclude self-review star markup`);
    assert(!schemas.flatMap(schema => schema['@graph'] || [schema]).some(schema => [schema['@type']].flat().includes('BreadcrumbList')), `${path}: removed breadcrumbs must not leave stale markup`);
    assert(!html.includes('aria-label="Breadcrumb"'), `${path}: breadcrumb navigation must be absent`);
    if (path === '/') assert(html.includes('Preschool &amp; Kindergarten in'), 'Homepage must describe the local service');
    if (path === '/programs') assert(html.includes('Choosing a program for your child'), 'Program questions must be server rendered');
    console.log(`PASS ${path}: canonical, title, description, social metadata, H1 and structured data`);
  }
  for (const imageUrl of imageUrls) {
    const parsed = new URL(imageUrl);
    assert.equal(parsed.origin, production, 'Social image must use the production domain');
    const response = await get(parsed.pathname + parsed.search);
    assert.equal(response.status, 200, 'Social image must load');
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Social image must be PNG');
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
  }
  const sitemapResponse = await get('/sitemap.xml');
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]).sort(), paths.map(path => new URL(path, production).href).sort());
  const robotsResponse = await get('/robots.txt');
  assert.equal(robotsResponse.status, 200);
  assert((await robotsResponse.text()).includes(`Sitemap: ${production}/sitemap.xml`));
  assert.equal((await get('/seo-check-nonexistent-page')).status, 404, 'Missing pages must not return a soft 404');
  console.log('PASS social image dimensions, sitemap, robots and missing-page status.');
  console.log('SEO checks passed. Search Console indexing and real-user performance still require separate checks.');
} catch (error) {
  console.error(`SEO check failed: ${error.message}`);
  process.exitCode = 1;
}
