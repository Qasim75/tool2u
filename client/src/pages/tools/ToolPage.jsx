import { Suspense, lazy } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/layouts/SEO';
import Loader from '@/components/ui/Loader';
import { getToolById, CATEGORIES } from '@/constants/tools';
import { TOOL_FAQS } from '@/constants/faq';
import { TOOL_CONTENT } from '@/constants/toolContent';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';
import CategoryIllustration from '@/components/illustrations/CategoryIllustration';
import ToolInfoSection from '@/components/tools/ToolInfoSection';
import { fadeUp } from '@/lib/motion';

const GenericTool = lazy(() => import('@/pages/tools/GenericTool'));

const TOOL_COMPONENTS = {
  'cgpa-calculator': lazy(() => import('@/pages/tools/CGPACalculator')),
  'qr-code-generator': lazy(() => import('@/pages/tools/QrCodeGenerator')),
  'whatsapp-link-generator': lazy(() => import('@/pages/tools/WhatsAppLinkGenerator')),
  'word-counter': lazy(() => import('@/pages/tools/WordCounter')),
  'json-to-csv': lazy(() => import('@/pages/tools/JsonToCsvConverter')),
  'case-converter': lazy(() => import('@/pages/tools/CaseConverter')),
  'password-generator': lazy(() => import('@/pages/tools/PasswordGenerator')),
  'json-formatter': lazy(() => import('@/pages/tools/JsonFormatter')),
  'age-calculator': lazy(() => import('@/pages/tools/AgeCalculator')),
  'online-code-editor': lazy(() => import('@/pages/tools/OnlineCodeEditor')),
};

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = getToolById(toolId);
  const { addRecentlyUsed } = useUser();

  useEffect(() => {
    if (tool) {
      addRecentlyUsed(tool.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool?.id]);

  if (!tool) return <Navigate to="/404" replace />;

  const category = CATEGORIES[tool.category];
  const Icon = tool.icon;
  const ToolComponent = TOOL_COMPONENTS[tool.id];

  const content = TOOL_CONTENT[tool.id];
  const faqs = content?.faq || TOOL_FAQS[tool.id] || [];
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        description: tool.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tool2u.io/' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://tool2u.io/tools' },
          { '@type': 'ListItem', position: 3, name: tool.name, item: `https://tool2u.io${tool.path}` },
        ],
      },
      ...(faqs.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }] : [])
    ],
  };

  return (
    <>
      <SEO title={tool.name} description={tool.description} path={tool.path} jsonLd={jsonLd} />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink dark:text-white/55 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto]">
          <ToolHero tool={tool} category={category} Icon={Icon} />
          <div
            className="hidden size-28 shrink-0 items-center justify-center rounded-3xl sm:flex"
            style={{ backgroundColor: `color-mix(in srgb, ${category.color} 10%, transparent)` }}
          >
            <CategoryIllustration category={category.id} color={category.color} className="h-24 w-24" />
          </div>
        </div>

        <div className="mt-10">
          <Suspense fallback={<Loader label={`Loading ${tool.shortName}…`} />}>
            {ToolComponent ? (
              <ToolComponent />
            ) : (
              <GenericTool toolId={tool.id} />
            )}
          </Suspense>
        </div>

        <ToolInfoSection toolName={tool.name} content={content} />
      </section>
    </>
  );
}

function ToolHero({ tool, category, Icon }) {
  const reduceMotion = useReducedMotion();
  const Wrap = reduceMotion ? 'div' : motion.div;
  const motionProps = reduceMotion
    ? {}
    : { initial: 'hidden', animate: 'visible', variants: fadeUp };

  return (
    <Wrap {...motionProps}>
      <div className="flex items-center gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `color-mix(in srgb, ${category.color} 16%, transparent)` }}
        >
          <Icon className="size-7" style={{ color: category.color }} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink dark:text-white sm:text-3xl">{tool.name}</h1>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: category.color }}>
            {category.label}
          </span>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-ink-soft dark:text-white/60">{tool.description}</p>
    </Wrap>
  );
}
