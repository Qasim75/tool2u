import { useState } from 'react';
import {
  CheckCircle2, ListOrdered, Sparkles, Lightbulb,
  Info, HelpCircle, ChevronDown, Layers,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import RevealSection from '@/components/motion/RevealSection';
import { RevealHeading, RevealParagraph } from '@/components/motion/RevealText';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';
import { cn } from '@/utils/cn';

function Block({ icon: Icon, eyebrow, title, children, delay = 0 }) {
  return (
    <RevealSection as="section" delay={delay} className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-mint-500/10 text-teal-700 dark:bg-mint-500/15 dark:text-mint-400">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <RevealHeading as="h2" delay={0.04} className="font-display text-xl font-semibold text-ink dark:text-white">
          {title}
        </RevealHeading>
      </div>
      {children}
    </RevealSection>
  );
}

function FaqRow({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/10 py-4 last:border-b-0 dark:border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-medium text-ink dark:text-white">{question}</span>
        <ChevronDown
          className={cn(
            'size-5 shrink-0 text-ink-soft transition-transform duration-200 dark:text-white/50',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      {open && <p className="mt-2.5 text-sm leading-relaxed text-ink-soft dark:text-white/60">{answer}</p>}
    </div>
  );
}

/**
 * ToolInfoSection — renders the structured content from TOOL_CONTENT
 * (constants/toolContent.js) below a tool's interactive UI: intro,
 * how-to steps, features, examples, use cases, tips, important notes,
 * and FAQ. Sections that have no data for a given tool simply don't
 * render, so this never shows an empty heading.
 */
export default function ToolInfoSection({ toolName, content }) {
  if (!content) return null;

  const { intro, howTo, features, examples, useCases, tips, important, faq } = content;

  return (
    <div className="mt-16 flex flex-col gap-14 border-t border-ink/10 pt-12 dark:border-white/10">
      {intro && (
        <Block icon={Info} title={`About ${toolName}`}>
          <RevealParagraph delay={0.08} className="max-w-3xl text-base leading-relaxed text-ink-soft dark:text-white/65">
            {intro}
          </RevealParagraph>
        </Block>
      )}

      {howTo?.length > 0 && (
        <Block icon={ListOrdered} title="How to use it" delay={0.05}>
          <StaggerGroup as="ol" className="flex max-w-3xl flex-col gap-3">
            {howTo.map((step, i) => (
              <StaggerItem as="li" key={i} className="flex gap-3.5 rounded-xl border border-ink/10 bg-white p-4 dark:border-white/10 dark:bg-surface-dark-raised">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-mint-400 dark:bg-mint-500 dark:text-teal-950">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-ink-soft dark:text-white/70">{step}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Block>
      )}

      {features?.length > 0 && (
        <Block icon={Sparkles} title="Features" delay={0.05}>
          <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature, i) => (
              <StaggerItem key={i}>
                <Card className="flex h-full items-start gap-2.5 p-4">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-mint-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-ink-soft dark:text-white/70">{feature}</span>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Block>
      )}

      {examples?.length > 0 && (
        <Block icon={Layers} title="Examples" delay={0.05}>
          <div className="flex max-w-3xl flex-col gap-4">
            {examples.map((ex, i) => (
              <RevealSection key={i} delay={0.06 * i}>
                <Card className="p-5">
                  <h3 className="font-display text-sm font-semibold text-ink dark:text-white">{ex.title}</h3>
                  {ex.code && (
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-ink/10 bg-paper-dim px-4 py-3 font-mono text-xs text-ink dark:border-white/10 dark:bg-surface-dark dark:text-white/80 whitespace-pre-wrap">
                      {ex.code}
                    </pre>
                  )}
                  {ex.description && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-white/60">{ex.description}</p>
                  )}
                </Card>
              </RevealSection>
            ))}
          </div>
        </Block>
      )}

      {useCases?.length > 0 && (
        <Block icon={Sparkles} title="Who uses this" delay={0.05}>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <StaggerItem key={i}>
                <Card className="h-full p-5">
                  <h3 className="font-display text-sm font-semibold text-ink dark:text-white">{uc.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft dark:text-white/60">{uc.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Block>
      )}

      {tips?.length > 0 && (
        <Block icon={Lightbulb} title="Tips" delay={0.05}>
          <StaggerGroup className="flex max-w-3xl flex-col gap-3">
            {tips.map((tip, i) => (
              <StaggerItem
                key={i}
                className="flex gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 dark:border-amber-400/20 dark:bg-amber-400/[0.06]"
              >
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-ink-soft dark:text-white/70">{tip}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Block>
      )}

      {important && (
        <Block icon={Info} title="Good to know" delay={0.05}>
          <RevealSection>
            <Card className="max-w-3xl border-teal-800/15 bg-teal-800/[0.04] p-5 dark:border-mint-500/15 dark:bg-mint-500/[0.06]">
              <p className="text-sm leading-relaxed text-ink-soft dark:text-white/70">{important}</p>
            </Card>
          </RevealSection>
        </Block>
      )}

      {faq?.length > 0 && (
        <Block icon={HelpCircle} title="Frequently asked questions" delay={0.05}>
          <div className="max-w-3xl">
            {faq.map((f, i) => (
              <FaqRow key={i} question={f.question} answer={f.answer} />
            ))}
          </div>
        </Block>
      )}
    </div>
  );
}
