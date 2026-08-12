import { Link } from 'react-router-dom';
import { Code2, AtSign, Briefcase, Users, Wrench, Sparkles } from 'lucide-react';
import { SITE, FOOTER_QUICK_LINKS, FOOTER_LEGAL_LINKS, SOCIAL_LINKS } from '@/constants/site';
import { CATEGORIES } from '@/constants/tools';
import { BLOG_POSTS } from '@/constants/blog';

const ICONS = { Code2, AtSign, Briefcase, Users };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-paper-dim/50 dark:border-white/10 dark:bg-surface-dark-raised/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink dark:text-white">
              <span className="flex size-9 items-center justify-center rounded-xl bg-teal-800 text-mint-400 dark:bg-mint-500 dark:text-teal-950">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </span>
              {SITE.name}
            </Link>
            <p className="max-w-xs text-sm text-ink-soft dark:text-white/50">{SITE.tagline}</p>

            <div className="mt-2 flex gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICONS[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-lg border border-ink/10 text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink dark:border-white/10 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Quick links" className="col-span-1">
            <h3 className="mb-3 text-sm font-semibold text-ink dark:text-white">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-ink-soft hover:text-ink dark:text-white/55 dark:hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tool categories" className="col-span-1">
            <h3 className="mb-3 text-sm font-semibold text-ink dark:text-white">Categories</h3>
            <ul className="flex flex-col gap-2.5">
              {Object.values(CATEGORIES).map((cat) => (
                <li key={cat.id} className="flex items-center gap-2">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                    aria-hidden="true"
                  />
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-sm text-ink-soft hover:text-ink dark:text-white/55 dark:hover:text-white"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Recent articles" className="col-span-1">
            <h3 className="mb-3 text-sm font-semibold text-ink dark:text-white">Recent Articles</h3>
            <ul className="flex flex-col gap-2.5">
              {BLOG_POSTS.slice(0, 4).map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="line-clamp-1 text-sm text-ink-soft hover:text-ink dark:text-white/55 dark:hover:text-white"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-600 dark:text-mint-400 dark:hover:text-mint-500">
                  View all posts <Sparkles className="size-3" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-2 mt-8 lg:col-span-2 lg:mt-0">
            <h3 className="mb-4 text-sm font-semibold text-ink dark:text-white">Stay Updated</h3>
            <p className="mb-4 text-sm text-ink-soft dark:text-white/50">Get notified when we add new tools.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm focus:border-teal-600 focus:outline-none dark:border-white/10 dark:bg-surface-dark-raised dark:text-white"
              />
              <button className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700 dark:bg-mint-500 dark:text-teal-950 dark:hover:bg-mint-400">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-ink/10 pt-6 text-sm text-ink-soft/70 md:flex-row dark:border-white/10 dark:text-white/40">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <nav aria-label="Legal" className="mt-4 md:mt-0">
            <ul className="flex gap-6">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-ink dark:hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
