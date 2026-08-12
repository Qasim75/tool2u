import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, User, ArrowLeft, Tag, Share2, Copy, Check,
  Sparkles, Clock, BookOpen, ChevronRight, Twitter, Linkedin, Facebook
} from 'lucide-react';
import SEO from '@/components/layouts/SEO';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BLOG_POSTS } from '@/constants/blog';
import RevealSection from '@/components/motion/RevealSection';
import { RevealHeading, RevealParagraph } from '@/components/motion/RevealText';

// Fluid cubic-bezier curve
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Stagger setup
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const slideFromBottom = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const zoomFromBack = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) return <Navigate to="/404" replace />;

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2);

  // Social Share Handlers
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform) => {
    let url = '';
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(post.title);

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({ title: post.title, text: post.excerpt, url: currentUrl });
          return;
        }
        break;
    }

    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
      />

      <article className="relative overflow-hidden py-12 sm:py-20">
        {/* Lightroom Ambient Glow Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none h-96 w-full max-w-5xl opacity-30 blur-[130px] bg-gradient-to-r from-teal-500 via-mint-400 to-indigo-500 dark:opacity-20" />
        <div className="absolute top-1/4 right-0 pointer-events-none h-72 w-72 blur-[100px] bg-emerald-500/15 rounded-full" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: TRANSITION_EASE }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-600 dark:text-mint-400 dark:hover:text-mint-300 mb-8 transition-transform hover:-translate-x-1"
            >
              <ArrowLeft className="size-4" /> Back to articles
            </Link>
          </motion.div>

          {/* Article Header */}
          <header className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: TRANSITION_EASE }}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-800 dark:border-white/10 dark:bg-mint-500/20 dark:text-mint-400 shadow-sm"
            >
              <Sparkles className="size-3.5" />
              {post.category}
            </motion.div>

            <RevealHeading as="h1" split className="text-3xl font-extrabold text-ink dark:text-white sm:text-5xl mb-6 leading-tight tracking-tight">
              {post.title}
            </RevealHeading>

            {/* Metadata Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: TRANSITION_EASE }}
              className="flex flex-wrap items-center gap-6 text-sm text-ink-soft dark:text-white/60 border-y border-ink/10 dark:border-white/10 py-4"
            >
              <div className="flex items-center gap-2 font-medium">
                <div className="p-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-mint-400">
                  <User className="size-4" />
                </div>
                <span>{post.author}</span>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <div className="p-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-mint-400">
                  <Calendar className="size-4" />
                </div>
                <span>{post.date}</span>
              </div>

              <div className="flex items-center gap-2 font-medium ml-auto">
                <div className="p-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-mint-400">
                  <BookOpen className="size-4" />
                </div>
                <span>5 min read</span>
              </div>
            </motion.div>
          </header>

          {/* Featured Hero Image */}
          <motion.div
            variants={zoomFromBack}
            initial="hidden"
            animate="visible"
            className="mb-12 overflow-hidden rounded-3xl border border-ink/10 dark:border-white/10 shadow-2xl relative group"
          >
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-[280px] sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </motion.div>

          {/* Main Grid Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

            {/* Article Main Body */}
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none text-ink-soft dark:text-white/80 leading-relaxed font-sans">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <RevealParagraph className="text-xl leading-relaxed text-ink dark:text-white/90 font-medium">
                    {post.excerpt}
                  </RevealParagraph>
                )}
              </div>

              {/* Tag Pill List */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-ink/10 dark:border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-soft/70 dark:text-white/40 mb-3">Related Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-white/5 border border-teal-500/10 dark:border-white/10 text-xs font-semibold text-teal-800 dark:text-mint-400 shadow-sm cursor-default"
                      >
                        <Tag className="size-3" /> {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sticky Sidebar */}
            <aside className="flex flex-col gap-8">
              {/* Share Card Widget */}
              <motion.div
                variants={slideFromRight}
                initial="hidden"
                animate="visible"
                className="sticky top-24"
              >
                <Card className="p-6 rounded-2xl border border-ink/10 bg-white/80 dark:border-white/10 dark:bg-surface-dark-raised/80 backdrop-blur-md shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 to-mint-400 opacity-80" />

                  <h4 className="font-bold text-ink dark:text-white mb-4 flex items-center gap-2 text-base">
                    <Share2 className="size-4 text-teal-600 dark:text-mint-400" />
                    Share Article
                  </h4>

                  <div className="flex flex-col gap-2.5">
                    <Button
                      onClick={() => handleShare('twitter')}
                      variant="secondary"
                      className="w-full justify-start text-xs font-semibold hover:bg-teal-50 dark:hover:bg-white/5"
                      icon={Twitter}
                    >
                      Share on X (Twitter)
                    </Button>
                    <Button
                      onClick={() => handleShare('linkedin')}
                      variant="secondary"
                      className="w-full justify-start text-xs font-semibold hover:bg-teal-50 dark:hover:bg-white/5"
                      icon={Linkedin}
                    >
                      Share on LinkedIn
                    </Button>
                    <Button
                      onClick={() => handleShare('facebook')}
                      variant="secondary"
                      className="w-full justify-start text-xs font-semibold hover:bg-teal-50 dark:hover:bg-white/5"
                      icon={Facebook}
                    >
                      Share on Facebook
                    </Button>

                    <button
                      onClick={handleCopyLink}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-ink/10 dark:border-white/10 bg-paper-dim/60 dark:bg-surface-dark text-xs font-semibold text-ink dark:text-white hover:border-teal-500/40 transition-all active:scale-98"
                    >
                      {copied ? (
                        <>
                          <Check className="size-4 text-emerald-500" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-4 text-teal-600 dark:text-mint-400" />
                          <span>Copy Article Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Related Posts Section in Sidebar */}
                  {relatedPosts.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-ink/10 dark:border-white/10">
                      <h4 className="font-bold text-ink dark:text-white mb-4 text-sm flex items-center justify-between">
                        <span>Related Reading</span>
                        <ChevronRight className="size-4 text-teal-600 dark:text-mint-400" />
                      </h4>
                      <div className="flex flex-col gap-3">
                        {relatedPosts.map(p => (
                          <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                            <div className="p-3 rounded-xl border border-ink/5 bg-paper-dim/40 dark:border-white/5 dark:bg-surface-dark/40 hover:border-teal-500/30 dark:hover:border-mint-400/30 transition-all duration-200">
                              <h5 className="text-xs font-bold text-ink dark:text-white group-hover:text-teal-700 dark:group-hover:text-mint-400 transition-colors line-clamp-2 leading-snug">
                                {p.title}
                              </h5>
                              <span className="text-[10px] text-ink-soft/60 dark:text-white/40 mt-1.5 block">
                                {p.date}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            </aside>

          </div>
        </div>
      </article>
    </>
  );
}