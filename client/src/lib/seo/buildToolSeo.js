import { SITE } from '@/constants/site';

/**
 * buildToolJsonLd
 * ----------------------------------------------------------------
 * Builds the schema.org JSON-LD graph for a tool page: the
 * SoftwareApplication entry, breadcrumbs, and an optional FAQPage
 * block. Extracted from `pages/tools/ToolPage.jsx` so the same
 * structured-data shape can be reused for future tool types (the
 * compiler, AI tools) without duplicating this logic, and so it can
 * be unit-tested in isolation.
 *
 * Output is identical to the inline version previously in
 * ToolPage.jsx — this is a pure refactor, not a behavior change.
 *
 * @param {{ name: string, description: string, path: string }} tool
 * @param {{ faqs?: Array<{ question: string, answer: string }>, applicationCategory?: string }} [options]
 */
export function buildToolJsonLd(tool, { faqs = [], applicationCategory = 'UtilitiesApplication' } = {}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory,
        operatingSystem: 'Any',
        description: tool.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE.url}/tools` },
          { '@type': 'ListItem', position: 3, name: tool.name, item: `${SITE.url}${tool.path}` },
        ],
      },
      ...(faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };
}

export default buildToolJsonLd;
