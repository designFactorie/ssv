import { createEnquiryEndpoint } from '@/lib/enquiry-server.mjs';

export const runtime = 'nodejs';
export const maxDuration = 30;
export const POST = createEnquiryEndpoint();
