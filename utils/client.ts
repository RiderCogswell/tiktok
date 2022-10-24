import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'aizt7o6e',
  dataset: 'production',
  apiVersion: '2022-10-23',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
