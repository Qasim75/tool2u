import {
  GraduationCap, QrCode, MessageCircle, Type, FileJson2, FileText,
  Search, Image as ImageIcon, FileDigit, ShieldCheck, Calculator,
  RefreshCw, Globe, Hash, Zap, Code2, Palette,
  Lock, KeyRound, Mail, CalendarDays, Ruler,
  TypeOutline, AlignLeft, ListOrdered, ArrowRightLeft,
  Copy, WrapText, Braces, FileCode, Terminal,
  Database, Globe2, BarChart3, Layers, Eye,
  Palette as PaletteIcon, Monitor, Smartphone, MonitorSmartphone,
  Crop, RotateCw, FlipHorizontal, FlipVertical, FileImage, Frame, Grid3X3,
  Mic, Volume2, BookOpen, PenTool,
  ListChecks, TrendingUp, Clock, Timer,
  Percent, DollarSign, PiggyBank, Receipt, CreditCard,
  HeartPulse, Activity, Flame, Dumbbell,
  FileSpreadsheet, Table, SortAsc,
  Binary, Hexagon, Octagon, LockKeyhole,
  Fingerprint, Key, UserCheck, UserRound,   Hash as HashTagIcon, Link, Link2,
  Radio, Signal, BatteryCharging, Network,
  Tags, AlertTriangle, HelpCircle, Lightbulb, Sparkles,
  Pencil, Eraser as EraserIcon, Minus,
  Gauge, Droplet, Shuffle, Dices,
  Share2,
} from 'lucide-react';

export const CATEGORIES = {
  students: {
    id: 'students',
    label: 'Students',
    description: 'Tools for academic success — GPA calculators, word counters, citation generators and more.',
    color: '#3b82f6',
    className: 'text-blue-500',
    shortDesc: 'Academic success tools',
  },
  developers: {
    id: 'developers',
    label: 'Developers',
    description: 'Code formatters, validators, converters and debugging tools for modern development.',
    color: '#10b981',
    className: 'text-emerald-500',
    shortDesc: 'Code & development tools',
  },
  productivity: {
    id: 'productivity',
    label: 'Productivity',
    description: 'Time savers, organizers and workflow tools to help you work smarter.',
    color: '#8b5cf6',
    className: 'text-violet-500',
    shortDesc: 'Work smarter tools',
  },
  utilities: {
    id: 'utilities',
    label: 'Utilities',
    description: 'Everyday handy tools — QR codes, generators, converters and quick helpers.',
    color: '#f59e0b',
    className: 'text-amber-500',
    shortDesc: 'Everyday helpers',
  },
  text: {
    id: 'text',
    label: 'Text Tools',
    description: 'Manipulate, analyze, convert and clean your text with powerful text utilities.',
    color: '#ec4899',
    className: 'text-pink-500',
    shortDesc: 'Text manipulation',
  },
  seo: {
    id: 'seo',
    label: 'SEO Tools',
    description: 'Optimize your website for search engines with meta tags, sitemaps and analyzers.',
    color: '#06b6d4',
    className: 'text-cyan-500',
    shortDesc: 'Search optimization',
  },
  image: {
    id: 'image',
    label: 'Image Tools',
    description: 'Resize, compress, convert and transform your images in the browser.',
    color: '#f43f5e',
    className: 'text-rose-500',
    shortDesc: 'Image processing',
  },
  pdf: {
    id: 'pdf',
    label: 'PDF Tools',
    description: 'Merge, split, compress and manage your PDF documents effortlessly.',
    color: '#ef4444',
    className: 'text-red-500',
    shortDesc: 'PDF management',
  },
  security: {
    id: 'security',
    label: 'Security Tools',
    description: 'Password generators, hash tools, UUID generators and encryption utilities.',
    color: '#6366f1',
    className: 'text-indigo-500',
    shortDesc: 'Privacy & protection',
  },
  calculators: {
    id: 'calculators',
    label: 'Calculators',
    description: 'Math, finance, health and science calculators for every need.',
    color: '#14b8a6',
    className: 'text-teal-500',
    shortDesc: 'Math & finance',
  },
  converters: {
    id: 'converters',
    label: 'Converters',
    description: 'Convert between formats — Base64, JSON, CSV, HTML, encoding and more.',
    color: '#f97316',
    className: 'text-orange-500',
    shortDesc: 'Format conversion',
  },
  web: {
    id: 'web',
    label: 'Web Tools',
    description: 'Color pickers, IP lookups, user agents, viewport tools and web utilities.',
    color: '#64748b',
    className: 'text-slate-500',
    shortDesc: 'Web utilities',
  },
};

export const TOOLS = [
  // ============ Students ============
  {
    id: 'cgpa-calculator', name: 'CGPA Calculator', shortName: 'CGPA Calc',
    description: 'Calculate your semester GPA and cumulative CGPA with any grading scale.',
    path: '/tools/cgpa-calculator', icon: GraduationCap, category: 'students',
    featured: true, popular: true, new: false,
  },
  {
    id: 'gpa-calculator', name: 'GPA Calculator', shortName: 'GPA Calc',
    description: 'Calculate your semester GPA with customizable credit hours and grades.',
    path: '/tools/gpa-calculator', icon: GraduationCap, category: 'students',
    featured: true, popular: true, new: true,
  },
  {
    id: 'word-counter', name: 'Word Counter', shortName: 'Words',
    description: 'Count words, characters, sentences, paragraphs and reading time as you type.',
    path: '/tools/word-counter', icon: Type, category: 'students',
    featured: true, popular: true, new: false,
  },
  {
    id: 'sentence-counter', name: 'Sentence Counter', shortName: 'Sentences',
    description: 'Count the number of sentences in your text instantly.',
    path: '/tools/sentence-counter', icon: Type, category: 'students',
  },
  {
    id: 'paragraph-counter', name: 'Paragraph Counter', shortName: 'Paragraphs',
    description: 'Count the number of paragraphs in your text.',
    path: '/tools/paragraph-counter', icon: Type, category: 'students',
  },
  {
    id: 'reading-time-calculator', name: 'Reading Time Calculator', shortName: 'Read Time',
    description: 'Estimate how long it takes to read a piece of text.',
    path: '/tools/reading-time-calculator', icon: Clock, category: 'students',
  },
  {
    id: 'speaking-time-calculator', name: 'Speaking Time Calculator', shortName: 'Speak Time',
    description: 'Estimate how long a speech or presentation will take.',
    path: '/tools/speaking-time-calculator', icon: Mic, category: 'students',
  },
  {
    id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', shortName: 'Lorem Ipsum',
    description: 'Generate placeholder text for your designs, layouts and documents.',
    path: '/tools/lorem-ipsum-generator', icon: FileText, category: 'students',
  },
  {
    id: 'gpa-percentage-converter', name: 'GPA to Percentage Converter', shortName: 'GPA → %',
    description: 'Convert between GPA scores and percentages using standard formulas.',
    path: '/tools/gpa-percentage-converter', icon: Percent, category: 'students',
  },
  {
    id: 'grade-calculator', name: 'Grade Calculator', shortName: 'Grade Calc',
    description: 'Calculate your final grade based on assignments, exams and weights.',
    path: '/tools/grade-calculator', icon: GraduationCap, category: 'students',
  },
  {
    id: 'study-hour-calculator', name: 'Study Hour Calculator', shortName: 'Study Hours',
    description: 'Calculate total study hours and weekly averages.',
    path: '/tools/study-hour-calculator', icon: Clock, category: 'students',
  },
  {
    id: 'citation-generator', name: 'Citation Generator', shortName: 'Citations',
    description: 'Generate APA, MLA, and Chicago citations for books, articles and websites.',
    path: '/tools/citation-generator', icon: BookOpen, category: 'students',
    new: true,
  },
  {
    id: 'thesis-statement-generator', name: 'Thesis Statement Generator', shortName: 'Thesis Gen',
    description: 'Create a strong thesis statement for your essay or research paper.',
    path: '/tools/thesis-statement-generator', icon: PenTool, category: 'students',
    new: true,
  },

  // ============ Developers ============
  {
    id: 'online-code-editor', name: 'Online Code Editor', shortName: 'Code Editor',
    description: 'Write, highlight, and run code in JavaScript, Python, Java, C++, Go, Rust and 11 more languages — free, sandboxed, no signup.',
    path: '/tools/online-code-editor', icon: Code2, category: 'developers',
    featured: true, popular: true, new: true, priority: true, hot: true,
  },
  {
    id: 'json-to-csv', name: 'JSON to CSV Converter', shortName: 'JSON → CSV',
    description: 'Paste or upload JSON and convert it to a clean, downloadable CSV file.',
    path: '/tools/json-to-csv', icon: FileJson2, category: 'developers',
    featured: true, popular: true, new: false,
  },
  {
    id: 'json-formatter', name: 'JSON Formatter', shortName: 'JSON Format',
    description: 'Beautify, minify, and validate your JSON data instantly.',
    path: '/tools/json-formatter', icon: FileJson2, category: 'developers',
    featured: true, popular: true, new: true,
  },
  {
    id: 'json-validator', name: 'JSON Validator', shortName: 'JSON Valid',
    description: 'Check if your JSON data is valid and well-formatted.',
    path: '/tools/json-validator', icon: FileJson2, category: 'developers',
    featured: true, popular: true, new: true,
  },
  {
    id: 'json-minifier', name: 'JSON Minifier', shortName: 'JSON Minify',
    description: 'Compress JSON data by removing whitespace and formatting.',
    path: '/tools/json-minifier', icon: Braces, category: 'developers',
  },
  {
    id: 'json-to-yaml', name: 'JSON to YAML Converter', shortName: 'JSON → YAML',
    description: 'Convert JSON data to YAML format instantly.',
    path: '/tools/json-to-yaml', icon: FileCode, category: 'developers',
  },
  {
    id: 'yaml-to-json', name: 'YAML to JSON Converter', shortName: 'YAML → JSON',
    description: 'Convert YAML data to JSON format.',
    path: '/tools/yaml-to-json', icon: FileCode, category: 'developers',
  },
  {
    id: 'xml-formatter', name: 'XML Formatter', shortName: 'XML Format',
    description: 'Beautify and format your XML data for readability.',
    path: '/tools/xml-formatter', icon: Code2, category: 'developers',
  },
  {
    id: 'html-formatter', name: 'HTML Formatter', shortName: 'HTML Format',
    description: 'Beautify and format your HTML code for better readability.',
    path: '/tools/html-formatter', icon: Code2, category: 'developers',
  },
  {
    id: 'html-minifier', name: 'HTML Minifier', shortName: 'HTML Minify',
    description: 'Compress HTML code by removing whitespace and comments.',
    path: '/tools/html-minifier', icon: Code2, category: 'developers',
  },
  {
    id: 'css-beautifier', name: 'CSS Beautifier', shortName: 'CSS Format',
    description: 'Beautify and format your CSS code.',
    path: '/tools/css-beautifier', icon: Code2, category: 'developers',
  },
  {
    id: 'css-minifier', name: 'CSS Minifier', shortName: 'CSS Minify',
    description: 'Compress CSS code by removing whitespace and formatting.',
    path: '/tools/css-minifier', icon: Code2, category: 'developers',
  },
  {
    id: 'js-beautifier', name: 'JavaScript Beautifier', shortName: 'JS Format',
    description: 'Beautify and format your JavaScript code.',
    path: '/tools/js-beautifier', icon: Code2, category: 'developers',
  },
  {
    id: 'js-minifier', name: 'JavaScript Minifier', shortName: 'JS Minify',
    description: 'Compress JavaScript code by removing whitespace.',
    path: '/tools/js-minifier', icon: Code2, category: 'developers',
  },
  {
    id: 'sql-formatter', name: 'SQL Formatter', shortName: 'SQL Format',
    description: 'Beautify and format your SQL queries for readability.',
    path: '/tools/sql-formatter', icon: Database, category: 'developers',
  },
  {
    id: 'yaml-formatter', name: 'YAML Formatter', shortName: 'YAML Format',
    description: 'Beautify and format your YAML configuration files.',
    path: '/tools/yaml-formatter', icon: FileCode, category: 'developers',
  },
  {
    id: 'markdown-preview', name: 'Markdown Preview', shortName: 'MD Preview',
    description: 'Preview your Markdown code as rendered HTML in real-time.',
    path: '/tools/markdown-preview', icon: FileText, category: 'developers',
  },
  {
    id: 'regex-tester', name: 'Regex Tester', shortName: 'Regex Test',
    description: 'Test regular expressions against your text with real-time matching.',
    path: '/tools/regex-tester', icon: Terminal, category: 'developers',
    new: true,
  },
  {
    id: 'code-diff-checker', name: 'Diff Checker', shortName: 'Diff',
    description: 'Compare two pieces of text or code and find the differences.',
    path: '/tools/code-diff-checker', icon: FileCode, category: 'developers',
    new: true,
  },
  {
    id: 'cron-expression-generator', name: 'Cron Expression Generator', shortName: 'Cron Gen',
    description: 'Generate cron expressions for scheduling tasks.',
    path: '/tools/cron-expression-generator', icon: Clock, category: 'developers',
    new: true,
  },
  {
    id: 'jwt-decoder', name: 'JWT Decoder', shortName: 'JWT Decode',
    description: 'Decode and inspect JSON Web Tokens (JWT) instantly.',
    path: '/tools/jwt-decoder', icon: KeyRound, category: 'developers',
    new: true,
  },
  {
    id: 'http-status-codes', name: 'HTTP Status Codes', shortName: 'HTTP Codes',
    description: 'Quick reference for all HTTP status codes and their meanings.',
    path: '/tools/http-status-codes', icon: Globe2, category: 'developers',
    new: true,
  },
  {
    id: 'api-response-formatter', name: 'API Response Formatter', shortName: 'API Format',
    description: 'Format and beautify API response JSON data.',
    path: '/tools/api-response-formatter', icon: FileJson2, category: 'developers',
    new: true,
  },
  {
    id: 'css-gradient-generator', name: 'CSS Gradient Generator', shortName: 'Gradients',
    description: 'Create beautiful CSS gradients with a visual editor.',
    path: '/tools/css-gradient-generator', icon: Palette, category: 'developers',
    new: true,
  },
  {
    id: 'box-shadow-generator', name: 'Box Shadow Generator', shortName: 'Shadows',
    description: 'Generate CSS box-shadow properties with a live preview.',
    path: '/tools/box-shadow-generator', icon: Layers, category: 'developers',
    new: true,
  },
  {
    id: 'border-radius-generator', name: 'Border Radius Generator', shortName: 'Radius',
    description: 'Create custom border-radius CSS with visual controls.',
    path: '/tools/border-radius-generator', icon: Palette, category: 'developers',
    new: true,
  },

  // ============ Text Tools ============
  {
    id: 'case-converter', name: 'Case Converter', shortName: 'Case Conv',
    description: 'Convert text to uppercase, lowercase, title case, sentence case, or camelCase.',
    path: '/tools/case-converter', icon: FileText, category: 'text',
    featured: true, popular: false, new: true,
  },
  {
    id: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', shortName: 'No Dupes',
    description: 'Remove duplicate lines from your text or list.',
    path: '/tools/remove-duplicate-lines', icon: FileText, category: 'text',
  },
  {
    id: 'remove-extra-spaces', name: 'Remove Extra Spaces', shortName: 'Trim Spaces',
    description: 'Remove multiple spaces, tabs and line breaks from your text.',
    path: '/tools/remove-extra-spaces', icon: FileText, category: 'text',
  },
  {
    id: 'reverse-text', name: 'Reverse Text', shortName: 'Reverse',
    description: 'Flip your text backwards, word by word, or character by character.',
    path: '/tools/reverse-text', icon: ArrowRightLeft, category: 'text',
  },
  {
    id: 'text-sorter', name: 'Text Sorter', shortName: 'Sort Lines',
    description: 'Sort lines of text alphabetically, numerically, or randomly.',
    path: '/tools/text-sorter', icon: ListOrdered, category: 'text',
  },
  {
    id: 'slug-generator', name: 'Slug Generator', shortName: 'Slug Gen',
    description: 'Convert any text into a clean, URL-friendly slug.',
    path: '/tools/slug-generator', icon: Globe, category: 'text',
  },
  {
    id: 'text-to-speech', name: 'Text to Speech', shortName: 'TTS',
    description: 'Convert your text into spoken audio using browser speech synthesis.',
    path: '/tools/text-to-speech', icon: Volume2, category: 'text',
    new: true,
  },
  {
    id: 'speech-to-text', name: 'Speech to Text', shortName: 'STT',
    description: 'Convert spoken words into text using your microphone.',
    path: '/tools/speech-to-text', icon: Mic, category: 'text',
    new: true,
  },
  {
    id: 'text-replacer', name: 'Find & Replace', shortName: 'Find/Replace',
    description: 'Find and replace text patterns with regular expression support.',
    path: '/tools/text-replacer', icon: WrapText, category: 'text',
    new: true,
  },
  {
    id: 'line-sorter', name: 'Line Sorter', shortName: 'Line Sort',
    description: 'Sort lines with options for ascending, descending, or random order.',
    path: '/tools/line-sorter', icon: SortAsc, category: 'text',
  },
  {
    id: 'text-to-binary', name: 'Text to Binary', shortName: 'Text → Bin',
    description: 'Convert text into binary representation.',
    path: '/tools/text-to-binary', icon: Binary, category: 'text',
  },
  {
    id: 'binary-to-text', name: 'Binary to Text', shortName: 'Bin → Text',
    description: 'Convert binary data back into readable text.',
    path: '/tools/binary-to-text', icon: Binary, category: 'text',
  },
  {
    id: 'text-to-hex', name: 'Text to Hex', shortName: 'Text → Hex',
    description: 'Convert text into hexadecimal representation.',
    path: '/tools/text-to-hex', icon: Hexagon, category: 'text',
  },
  {
    id: 'hex-to-text', name: 'Hex to Text', shortName: 'Hex → Text',
    description: 'Convert hexadecimal data back into text.',
    path: '/tools/hex-to-text', icon: Hexagon, category: 'text',
  },
  {
    id: 'text-repeater', name: 'Text Repeater', shortName: 'Repeat Text',
    description: 'Repeat any text a specified number of times.',
    path: '/tools/text-repeater', icon: Copy, category: 'text',
    new: true,
  },
  {
    id: 'line-counter', name: 'Line Counter', shortName: 'Lines',
    description: 'Count the number of lines in your text.',
    path: '/tools/line-counter', icon: ListOrdered, category: 'text',
  },
  {
    id: 'character-counter', name: 'Character Counter', shortName: 'Characters',
    description: 'Count characters with and without spaces.',
    path: '/tools/character-counter', icon: Type, category: 'text',
  },
  {
    id: 'emoji-remover', name: 'Emoji Remover', shortName: 'No Emoji',
    description: 'Remove all emojis and special characters from your text.',
    path: '/tools/emoji-remover', icon: EraserIcon, category: 'text',
    new: true,
  },
  {
    id: 'html-to-text', name: 'HTML to Text', shortName: 'HTML → Text',
    description: 'Strip HTML tags and extract plain text content.',
    path: '/tools/html-to-text', icon: Code2, category: 'text',
  },
  {
    id: 'url-extractor', name: 'URL Extractor', shortName: 'Extract URLs',
    description: 'Extract all URLs from a block of text.',
    path: '/tools/url-extractor', icon: Link, category: 'text',
    new: true,
  },
  {
    id: 'email-extractor', name: 'Email Extractor', shortName: 'Extract Emails',
    description: 'Extract all email addresses from a block of text.',
    path: '/tools/email-extractor', icon: Mail, category: 'text',
    new: true,
  },
  {
    id: 'text-uppercase', name: 'Text Uppercaser', shortName: 'UPPER',
    description: 'Convert all text to uppercase letters.',
    path: '/tools/text-uppercase', icon: TypeOutline, category: 'text',
  },
  {
    id: 'text-lowercase', name: 'Text Lowercaser', shortName: 'lower',
    description: 'Convert all text to lowercase letters.',
    path: '/tools/text-lowercase', icon: TypeOutline, category: 'text',
  },
  {
    id: 'text-title-case', name: 'Text Title Case', shortName: 'Title Case',
    description: 'Convert text to title case (Capitalize Every Word).',
    path: '/tools/text-title-case', icon: TypeOutline, category: 'text',
  },
  {
    id: 'text-sentence-case', name: 'Text Sentence Case', shortName: 'Sentence case',
    description: 'Convert text to sentence case with proper capitalization.',
    path: '/tools/text-sentence-case', icon: TypeOutline, category: 'text',
  },
  {
    id: 'text-alternating-case', name: 'Alternating Case', shortName: 'aLtErNaTiNg',
    description: 'Convert text to alternating upper and lowercase.',
    path: '/tools/text-alternating-case', icon: TypeOutline, category: 'text',
    new: true,
  },
  {
    id: 'text-remove-accents', name: 'Remove Accents', shortName: 'No Accents',
    description: 'Remove accent marks and diacritics from text.',
    path: '/tools/text-remove-accents', icon: EraserIcon, category: 'text',
    new: true,
  },
  {
    id: 'text-shuffle', name: 'Text Shuffle', shortName: 'Shuffle',
    description: 'Randomly shuffle words, lines, or characters in your text.',
    path: '/tools/text-shuffle', icon: RefreshCw, category: 'text',
    new: true,
  },
  {
    id: 'text-indent', name: 'Text Indenter', shortName: 'Indent',
    description: 'Add or remove indentation from your text lines.',
    path: '/tools/text-indent', icon: AlignLeft, category: 'text',
  },
  {
    id: 'text-wrap', name: 'Text Wrapper', shortName: 'Wrap Text',
    description: 'Wrap text to a specific line width.',
    path: '/tools/text-wrap', icon: WrapText, category: 'text',
  },
  {
    id: 'rot13-encoder', name: 'ROT13 Encoder', shortName: 'ROT13',
    description: 'Encode or decode text using the ROT13 cipher.',
    path: '/tools/rot13-encoder', icon: RefreshCw, category: 'text',
    new: true,
  },
  {
    id: 'leetspeak-generator', name: 'Leetspeak Generator', shortName: 'L33t',
    description: 'Convert text to leetspeak (1337) style.',
    path: '/tools/leetspeak-generator', icon: Type, category: 'text',
    new: true,
  },
  {
    id: 'zalgo-text-generator', name: 'Zalgo Text Generator', shortName: 'Z̴͛a̴l̴g̴o̴',
    description: 'Add creepy Zalgo-style combining characters to your text.',
    path: '/tools/zalgo-text-generator', icon: AlertTriangle, category: 'text',
    new: true,
  },
  {
    id: 'strikethrough-text', name: 'Strikethrough Generator', shortName: 'Strikethrough',
    description: 'Generate text with strikethrough formatting.',
    path: '/tools/strikethrough-text', icon: Minus, category: 'text',
    new: true,
  },
  {
    id: 'upside-down-text', name: 'Upside Down Text', shortName: 'Flip Text',
    description: 'Flip your text upside down for fun.',
    path: '/tools/upside-down-text', icon: RotateCw, category: 'text',
    new: true,
  },
  {
    id: 'wide-text-generator', name: 'Wide Text Generator', shortName: 'Ｗｉｄｅ',
    description: 'Convert text to wide/fullwidth characters.',
    path: '/tools/wide-text-generator', icon: Type, category: 'text',
    new: true,
  },
  {
    id: 'small-text-generator', name: 'Small Text Generator', shortName: 'ˢᵐᵃˡˡ',
    description: 'Convert text to superscript small text.',
    path: '/tools/small-text-generator', icon: Type, category: 'text',
    new: true,
  },
  {
    id: 'bold-text-generator', name: 'Bold Text Generator', shortName: '𝐁𝐨𝐥𝐝',
    description: 'Generate bold Unicode text for social media.',
    path: '/tools/bold-text-generator', icon: Type, category: 'text',
    new: true,
  },
  {
    id: 'italic-text-generator', name: 'Italic Text Generator', shortName: '𝐼𝑡𝑎𝑙',
    description: 'Generate italic Unicode text for social media.',
    path: '/tools/italic-text-generator', icon: Type, category: 'text',
    new: true,
  },

  // ============ Security Tools ============
  {
    id: 'password-generator', name: 'Password Generator', shortName: 'Pass Gen',
    description: 'Create secure, random passwords with custom length and character sets.',
    path: '/tools/password-generator', icon: ShieldCheck, category: 'security',
    featured: true, popular: true, new: true,
  },
  {
    id: 'md5-generator', name: 'MD5 Generator', shortName: 'MD5 Hash',
    description: 'Generate an MD5 hash from your text using the browser Web Crypto API.',
    path: '/tools/md5-generator', icon: ShieldCheck, category: 'security',
  },
  {
    id: 'sha1-generator', name: 'SHA1 Generator', shortName: 'SHA1 Hash',
    description: 'Generate a SHA1 hash from your text.',
    path: '/tools/sha1-generator', icon: ShieldCheck, category: 'security',
  },
  {
    id: 'sha256-generator', name: 'SHA256 Generator', shortName: 'SHA256 Hash',
    description: 'Generate a SHA256 hash from your text.',
    path: '/tools/sha256-generator', icon: ShieldCheck, category: 'security',
  },
  {
    id: 'sha512-generator', name: 'SHA512 Generator', shortName: 'SHA512 Hash',
    description: 'Generate a SHA512 hash from your text.',
    path: '/tools/sha512-generator', icon: ShieldCheck, category: 'security',
  },
  {
    id: 'uuid-generator', name: 'UUID Generator', shortName: 'UUID Gen',
    description: 'Generate unique identifiers (UUID v4) instantly.',
    path: '/tools/uuid-generator', icon: Hash, category: 'security',
  },
  {
    id: 'random-number-generator', name: 'Random Number Generator', shortName: 'RNG',
    description: 'Generate random numbers within a custom range.',
    path: '/tools/random-number-generator', icon: Hash, category: 'security',
    new: true,
  },
  {
    id: 'random-string-generator', name: 'Random String Generator', shortName: 'Rand String',
    description: 'Generate random alphanumeric strings of any length.',
    path: '/tools/random-string-generator', icon: Hash, category: 'security',
    new: true,
  },
  {
    id: 'passphrase-generator', name: 'Passphrase Generator', shortName: 'Passphrase',
    description: 'Generate memorable passphrases from word lists.',
    path: '/tools/passphrase-generator', icon: Key, category: 'security',
    new: true,
  },
  {
    id: 'password-strength-checker', name: 'Password Strength Checker', shortName: 'Strength',
    description: 'Check how strong your password is against common attacks.',
    path: '/tools/password-strength-checker', icon: Lock, category: 'security',
    new: true,
  },
  {
    id: 'bcrypt-hash-generator', name: 'Bcrypt Hash Generator', shortName: 'Bcrypt',
    description: 'Generate bcrypt-style hashes (simulated in browser).',
    path: '/tools/bcrypt-hash-generator', icon: LockKeyhole, category: 'security',
    new: true,
  },
  {
    id: 'token-generator', name: 'API Token Generator', shortName: 'API Token',
    description: 'Generate secure API tokens and bearer tokens.',
    path: '/tools/token-generator', icon: KeyRound, category: 'security',
    new: true,
  },
  {
    id: 'otp-generator', name: 'OTP Generator', shortName: 'OTP Gen',
    description: 'Generate one-time passwords for testing.',
    path: '/tools/otp-generator', icon: Fingerprint, category: 'security',
    new: true,
  },

  // ============ Image Tools ============
  {
    id: 'image-compressor', name: 'Image Compressor', shortName: 'Compress',
    description: 'Reduce image file size without losing quality for faster web performance.',
    path: '/tools/image-compressor', icon: ImageIcon, category: 'image',
    featured: true, popular: true, new: true,
  },
  {
    id: 'image-resizer', name: 'Image Resizer', shortName: 'Resize',
    description: 'Resize images to any dimension with aspect ratio control.',
    path: '/tools/image-resizer', icon: Frame, category: 'image',
  },
  {
    id: 'crop-image', name: 'Crop Image', shortName: 'Crop',
    description: 'Crop images to specific dimensions or aspect ratios.',
    path: '/tools/crop-image', icon: Crop, category: 'image',
  },
  {
    id: 'rotate-image', name: 'Rotate Image', shortName: 'Rotate',
    description: 'Rotate images clockwise or counter-clockwise by any angle.',
    path: '/tools/rotate-image', icon: RotateCw, category: 'image',
  },
  {
    id: 'flip-image', name: 'Flip Image', shortName: 'Flip',
    description: 'Flip images horizontally or vertically.',
    path: '/tools/flip-image', icon: FlipHorizontal, category: 'image',
  },
  {
    id: 'jpg-to-png', name: 'JPG to PNG Converter', shortName: 'JPG → PNG',
    description: 'Convert JPG images to PNG format with transparency support.',
    path: '/tools/jpg-to-png', icon: FileImage, category: 'image',
  },
  {
    id: 'png-to-jpg', name: 'PNG to JPG Converter', shortName: 'PNG → JPG',
    description: 'Convert PNG images to JPG format with quality control.',
    path: '/tools/png-to-jpg', icon: FileImage, category: 'image',
  },
  {
    id: 'webp-converter', name: 'WebP Converter', shortName: 'WebP',
    description: 'Convert images to the modern WebP format for web optimization.',
    path: '/tools/webp-converter', icon: FileImage, category: 'image',
  },
  {
    id: 'svg-viewer', name: 'SVG Viewer', shortName: 'SVG View',
    description: 'Preview and inspect SVG code with live rendering.',
    path: '/tools/svg-viewer', icon: FileImage, category: 'image',
    new: true,
  },
  {
    id: 'base64-image-converter', name: 'Image to Base64', shortName: 'Img → B64',
    description: 'Convert images to Base64 data URIs for embedding.',
    path: '/tools/base64-image-converter', icon: FileImage, category: 'image',
    new: true,
  },
  {
    id: 'favicon-generator', name: 'Favicon Generator', shortName: 'Favicon',
    description: 'Create favicons from any image with multiple sizes.',
    path: '/tools/favicon-generator', icon: Globe, category: 'image',
    new: true,
  },
  {
    id: 'image-placeholder-generator', name: 'Placeholder Image Generator', shortName: 'Placeholder',
    description: 'Generate placeholder images with custom sizes and colors.',
    path: '/tools/image-placeholder-generator', icon: Grid3X3, category: 'image',
    new: true,
  },
  {
    id: 'image-to-pdf', name: 'Image to PDF', shortName: 'Img → PDF',
    description: 'Convert images to PDF documents.',
    path: '/tools/image-to-pdf', icon: FileDigit, category: 'image',
    new: true,
  },

  // ============ PDF Tools ============
  {
    id: 'merge-pdf', name: 'Merge PDF', shortName: 'Merge',
    description: 'Combine multiple PDF files into a single document.',
    path: '/tools/merge-pdf', icon: FileDigit, category: 'pdf',
  },
  {
    id: 'split-pdf', name: 'Split PDF', shortName: 'Split',
    description: 'Extract pages from a PDF or split into multiple files.',
    path: '/tools/split-pdf', icon: FileDigit, category: 'pdf',
  },
  {
    id: 'compress-pdf', name: 'Compress PDF', shortName: 'Compress',
    description: 'Reduce the file size of your PDF documents.',
    path: '/tools/compress-pdf', icon: FileDigit, category: 'pdf',
  },
  {
    id: 'pdf-to-text', name: 'PDF to Text', shortName: 'PDF → Text',
    description: 'Extract text content from PDF files.',
    path: '/tools/pdf-to-text', icon: FileText, category: 'pdf',
    new: true,
  },
  {
    id: 'word-to-pdf', name: 'Word to PDF', shortName: 'Word → PDF',
    description: 'Convert Word documents to PDF format.',
    path: '/tools/word-to-pdf', icon: FileDigit, category: 'pdf',
    new: true,
  },
  {
    id: 'pdf-page-counter', name: 'PDF Page Counter', shortName: 'Page Count',
    description: 'Count the number of pages in a PDF file.',
    path: '/tools/pdf-page-counter', icon: FileDigit, category: 'pdf',
    new: true,
  },

  // ============ SEO Tools ============
  {
    id: 'meta-tag-generator', name: 'Meta Tag Generator', shortName: 'Meta Tags',
    description: 'Generate SEO-friendly meta tags for your website pages.',
    path: '/tools/meta-tag-generator', icon: Search, category: 'seo',
    featured: true, popular: false, new: true,
  },
  {
    id: 'robots-txt-generator', name: 'Robots.txt Generator', shortName: 'Robots.txt',
    description: 'Generate a robots.txt file to control search engine crawling.',
    path: '/tools/robots-txt-generator', icon: Search, category: 'seo',
  },
  {
    id: 'sitemap-generator', name: 'Sitemap Generator', shortName: 'Sitemap',
    description: 'Generate XML sitemaps for search engines.',
    path: '/tools/sitemap-generator', icon: Search, category: 'seo',
  },
  {
    id: 'keyword-density-checker', name: 'Keyword Density Checker', shortName: 'Keywords',
    description: 'Analyze keyword frequency and density in your content.',
    path: '/tools/keyword-density-checker', icon: BarChart3, category: 'seo',
  },
  {
    id: 'title-tag-generator', name: 'Title Tag Generator', shortName: 'Title Tags',
    description: 'Generate optimized title tags for SEO with length preview.',
    path: '/tools/title-tag-generator', icon: Tags, category: 'seo',
    new: true,
  },
  {
    id: 'og-tag-generator', name: 'Open Graph Tag Generator', shortName: 'OG Tags',
    description: 'Generate Open Graph tags for social media sharing.',
    path: '/tools/og-tag-generator', icon: Share2, category: 'seo',
    new: true,
  },
  {
    id: 'schema-markup-generator', name: 'Schema Markup Generator', shortName: 'Schema',
    description: 'Generate structured data (JSON-LD) for rich search results.',
    path: '/tools/schema-markup-generator', icon: Code2, category: 'seo',
    new: true,
  },
  {
    id: 'canonical-url-generator', name: 'Canonical URL Generator', shortName: 'Canonical',
    description: 'Generate canonical URL tags to avoid duplicate content.',
    path: '/tools/canonical-url-generator', icon: Link2, category: 'seo',
    new: true,
  },
  {
    id: 'word-frequency-analyzer', name: 'Word Frequency Analyzer', shortName: 'Freq Analysis',
    description: 'Analyze word frequency and common phrases in your content.',
    path: '/tools/word-frequency-analyzer', icon: BarChart3, category: 'seo',
    new: true,
  },
  {
    id: 'content-length-checker', name: 'Content Length Checker', shortName: 'Length',
    description: 'Check if your content meets recommended SEO length guidelines.',
    path: '/tools/content-length-checker', icon: Ruler, category: 'seo',
    new: true,
  },

  // ============ Calculators ============
  {
    id: 'age-calculator', name: 'Age Calculator', shortName: 'Age Calc',
    description: 'Calculate your exact age in years, months, days, hours and minutes.',
    path: '/tools/age-calculator', icon: Calculator, category: 'calculators',
    featured: true, popular: false, new: true,
  },
  {
    id: 'percentage-calculator', name: 'Percentage Calculator', shortName: 'Percentage',
    description: 'Calculate percentages, increases, decreases and differences.',
    path: '/tools/percentage-calculator', icon: Percent, category: 'calculators',
    featured: true, popular: true, new: false,
  },
  {
    id: 'emi-calculator', name: 'EMI Calculator', shortName: 'EMI Calc',
    description: 'Calculate monthly loan installments with interest breakdown.',
    path: '/tools/emi-calculator', icon: Calculator, category: 'calculators',
  },
  {
    id: 'bmi-calculator', name: 'BMI Calculator', shortName: 'BMI Calc',
    description: 'Calculate your Body Mass Index and see your health category.',
    path: '/tools/bmi-calculator', icon: HeartPulse, category: 'calculators',
  },
  {
    id: 'discount-calculator', name: 'Discount Calculator', shortName: 'Discount',
    description: 'Calculate discounted prices and savings instantly.',
    path: '/tools/discount-calculator', icon: Percent, category: 'calculators',
    new: true,
  },
  {
    id: 'tip-calculator', name: 'Tip Calculator', shortName: 'Tip Calc',
    description: 'Split bills and calculate tips for groups.',
    path: '/tools/tip-calculator', icon: DollarSign, category: 'calculators',
    new: true,
  },
  {
    id: 'compound-interest-calculator', name: 'Compound Interest Calculator', shortName: 'Compound Int.',
    description: 'Calculate compound interest growth over time.',
    path: '/tools/compound-interest-calculator', icon: TrendingUp, category: 'calculators',
    new: true,
  },
  {
    id: 'simple-interest-calculator', name: 'Simple Interest Calculator', shortName: 'Simple Int.',
    description: 'Calculate simple interest on loans and investments.',
    path: '/tools/simple-interest-calculator', icon: Percent, category: 'calculators',
    new: true,
  },
  {
    id: 'loan-calculator', name: 'Loan Calculator', shortName: 'Loan Calc',
    description: 'Calculate total loan cost, monthly payments and amortization.',
    path: '/tools/loan-calculator', icon: CreditCard, category: 'calculators',
    new: true,
  },
  {
    id: 'savings-calculator', name: 'Savings Calculator', shortName: 'Savings',
    description: 'Plan your savings goals with monthly contributions.',
    path: '/tools/savings-calculator', icon: PiggyBank, category: 'calculators',
    new: true,
  },
  {
    id: 'retirement-calculator', name: 'Retirement Calculator', shortName: 'Retirement',
    description: 'Estimate your retirement savings and income needs.',
    path: '/tools/retirement-calculator', icon: PiggyBank, category: 'calculators',
    new: true,
  },
  {
    id: 'salary-calculator', name: 'Salary Calculator', shortName: 'Salary',
    description: 'Convert between hourly, weekly, monthly and annual salary.',
    path: '/tools/salary-calculator', icon: DollarSign, category: 'calculators',
    new: true,
  },
  {
    id: 'vat-calculator', name: 'VAT Calculator', shortName: 'VAT Calc',
    description: 'Calculate VAT-inclusive and VAT-exclusive prices.',
    path: '/tools/vat-calculator', icon: Receipt, category: 'calculators',
    new: true,
  },
  {
    id: 'tax-calculator', name: 'Income Tax Calculator', shortName: 'Tax Calc',
    description: 'Estimate your income tax with customizable brackets.',
    path: '/tools/tax-calculator', icon: Receipt, category: 'calculators',
    new: true,
  },
  {
    id: 'fraction-calculator', name: 'Fraction Calculator', shortName: 'Fractions',
    description: 'Add, subtract, multiply and divide fractions.',
    path: '/tools/fraction-calculator', icon: Calculator, category: 'calculators',
    new: true,
  },
  {
    id: 'scientific-calculator', name: 'Scientific Calculator', shortName: 'Sci Calc',
    description: 'Advanced calculator with trigonometric, logarithmic and exponential functions.',
    path: '/tools/scientific-calculator', icon: Calculator, category: 'calculators',
    new: true,
  },
  {
    id: 'unit-converter', name: 'Unit Converter', shortName: 'Units',
    description: 'Convert between length, weight, temperature, volume and more.',
    path: '/tools/unit-converter', icon: Ruler, category: 'calculators',
    new: true,
  },
  {
    id: 'speed-calculator', name: 'Speed Calculator', shortName: 'Speed',
    description: 'Calculate speed, distance, or time from the other two.',
    path: '/tools/speed-calculator', icon: Activity, category: 'calculators',
    new: true,
  },
  {
    id: 'fuel-cost-calculator', name: 'Fuel Cost Calculator', shortName: 'Fuel Cost',
    description: 'Calculate fuel costs for trips based on distance and consumption.',
    path: '/tools/fuel-cost-calculator', icon: Gauge, category: 'calculators',
    new: true,
  },
  {
    id: 'calorie-calculator', name: 'Calorie Calculator', shortName: 'Calories',
    description: 'Calculate daily calorie needs based on activity level.',
    path: '/tools/calorie-calculator', icon: Flame, category: 'calculators',
    new: true,
  },
  {
    id: 'water-intake-calculator', name: 'Water Intake Calculator', shortName: 'Water',
    description: 'Calculate your recommended daily water intake.',
    path: '/tools/water-intake-calculator', icon: Droplet, category: 'calculators',
    new: true,
  },
  {
    id: 'heart-rate-calculator', name: 'Heart Rate Calculator', shortName: 'Heart Rate',
    description: 'Calculate target heart rate zones for exercise.',
    path: '/tools/heart-rate-calculator', icon: HeartPulse, category: 'calculators',
    new: true,
  },
  {
    id: 'bmr-calculator', name: 'BMR Calculator', shortName: 'BMR',
    description: 'Calculate your Basal Metabolic Rate for fitness planning.',
    path: '/tools/bmr-calculator', icon: Activity, category: 'calculators',
    new: true,
  },
  {
    id: 'body-fat-calculator', name: 'Body Fat Calculator', shortName: 'Body Fat',
    description: 'Estimate body fat percentage using common formulas.',
    path: '/tools/body-fat-calculator', icon: Activity, category: 'calculators',
    new: true,
  },
  {
    id: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', shortName: 'Ideal Wt',
    description: 'Calculate ideal body weight based on height and gender.',
    path: '/tools/ideal-weight-calculator', icon: Activity, category: 'calculators',
    new: true,
  },
  {
    id: 'pregnancy-calculator', name: 'Pregnancy Due Date Calculator', shortName: 'Due Date',
    description: 'Calculate estimated due date from last menstrual period.',
    path: '/tools/pregnancy-calculator', icon: HeartPulse, category: 'calculators',
    new: true,
  },
  {
    id: 'ovulation-calculator', name: 'Ovulation Calculator', shortName: 'Ovulation',
    description: 'Estimate ovulation and fertile window dates.',
    path: '/tools/ovulation-calculator', icon: HeartPulse, category: 'calculators',
    new: true,
  },
  {
    id: 'macro-calculator', name: 'Macro Calculator', shortName: 'Macros',
    description: 'Calculate protein, carbs and fat targets for your goals.',
    path: '/tools/macro-calculator', icon: Dumbbell, category: 'calculators',
    new: true,
  },
  {
    id: 'pace-calculator', name: 'Running Pace Calculator', shortName: 'Pace',
    description: 'Calculate running pace, speed, and time for distances.',
    path: '/tools/pace-calculator', icon: Activity, category: 'calculators',
    new: true,
  },
  {
    id: 'one-rep-max-calculator', name: 'One Rep Max Calculator', shortName: '1RM',
    description: 'Estimate your one-rep max for strength training.',
    path: '/tools/one-rep-max-calculator', icon: Dumbbell, category: 'calculators',
    new: true,
  },

  // ============ Converters ============
  {
    id: 'base64-encode', name: 'Base64 Encode', shortName: 'B64 Enc',
    description: 'Encode text or data into Base64 format.',
    path: '/tools/base64-encode', icon: RefreshCw, category: 'converters',
  },
  {
    id: 'base64-decode', name: 'Base64 Decode', shortName: 'B64 Dec',
    description: 'Decode Base64 data back to plain text.',
    path: '/tools/base64-decode', icon: RefreshCw, category: 'converters',
  },
  {
    id: 'url-encode', name: 'URL Encode', shortName: 'URL Enc',
    description: 'Encode text for safe use in URLs.',
    path: '/tools/url-encode', icon: Globe, category: 'converters',
  },
  {
    id: 'url-decode', name: 'URL Decode', shortName: 'URL Dec',
    description: 'Decode URL-encoded text back to plain text.',
    path: '/tools/url-decode', icon: Globe, category: 'converters',
  },
  {
    id: 'html-encode', name: 'HTML Encode', shortName: 'HTML Enc',
    description: 'Encode special characters into HTML entities.',
    path: '/tools/html-encode', icon: Code2, category: 'converters',
  },
  {
    id: 'html-decode', name: 'HTML Decode', shortName: 'HTML Dec',
    description: 'Decode HTML entities back to special characters.',
    path: '/tools/html-decode', icon: Code2, category: 'converters',
  },
  {
    id: 'csv-to-json', name: 'CSV to JSON Converter', shortName: 'CSV → JSON',
    description: 'Convert CSV data to JSON format.',
    path: '/tools/csv-to-json', icon: FileJson2, category: 'converters',
  },
  {
    id: 'tsv-to-csv', name: 'TSV to CSV Converter', shortName: 'TSV → CSV',
    description: 'Convert tab-separated values to comma-separated values.',
    path: '/tools/tsv-to-csv', icon: Table, category: 'converters',
  },
  {
    id: 'csv-to-excel', name: 'CSV to Excel', shortName: 'CSV → Excel',
    description: 'Convert CSV files to Excel-compatible format.',
    path: '/tools/csv-to-excel', icon: FileSpreadsheet, category: 'converters',
    new: true,
  },
  {
    id: 'number-to-words', name: 'Number to Words', shortName: 'Num → Words',
    description: 'Convert numbers to written words (123 → "one hundred twenty-three").',
    path: '/tools/number-to-words', icon: Type, category: 'converters',
    new: true,
  },
  {
    id: 'words-to-number', name: 'Words to Number', shortName: 'Words → Num',
    description: 'Convert written numbers to numeric values.',
    path: '/tools/words-to-number', icon: Calculator, category: 'converters',
    new: true,
  },
  {
    id: 'roman-numeral-converter', name: 'Roman Numeral Converter', shortName: 'Roman',
    description: 'Convert between Roman numerals and Arabic numbers.',
    path: '/tools/roman-numeral-converter', icon: Hash, category: 'converters',
    new: true,
  },
  {
    id: 'binary-converter', name: 'Binary Converter', shortName: 'Binary',
    description: 'Convert between binary, decimal, octal and hexadecimal.',
    path: '/tools/binary-converter', icon: Binary, category: 'converters',
    new: true,
  },
  {
    id: 'hex-converter', name: 'Hexadecimal Converter', shortName: 'Hex',
    description: 'Convert between hexadecimal and other number bases.',
    path: '/tools/hex-converter', icon: Hexagon, category: 'converters',
    new: true,
  },
  {
    id: 'octal-converter', name: 'Octal Converter', shortName: 'Octal',
    description: 'Convert between octal and other number systems.',
    path: '/tools/octal-converter', icon: Octagon, category: 'converters',
    new: true,
  },
  {
    id: 'ascii-converter', name: 'ASCII Converter', shortName: 'ASCII',
    description: 'Convert between ASCII codes and characters.',
    path: '/tools/ascii-converter', icon: Type, category: 'converters',
    new: true,
  },
  {
    id: 'json-to-html-table', name: 'JSON to HTML Table', shortName: 'JSON → Table',
    description: 'Convert JSON arrays to HTML tables.',
    path: '/tools/json-to-html-table', icon: Table, category: 'converters',
    new: true,
  },
  {
    id: 'markdown-to-html', name: 'Markdown to HTML', shortName: 'MD → HTML',
    description: 'Convert Markdown text to HTML markup.',
    path: '/tools/markdown-to-html', icon: Code2, category: 'converters',
    new: true,
  },
  {
    id: 'html-to-markdown', name: 'HTML to Markdown', shortName: 'HTML → MD',
    description: 'Convert HTML markup to Markdown syntax.',
    path: '/tools/html-to-markdown', icon: FileText, category: 'converters',
    new: true,
  },
  {
    id: 'bbcode-generator', name: 'BBCode Generator', shortName: 'BBCode',
    description: 'Convert text with formatting to BBCode for forums.',
    path: '/tools/bbcode-generator', icon: Code2, category: 'converters',
    new: true,
  },

  // ============ Web Tools ============
  {
    id: 'color-picker', name: 'Color Picker', shortName: 'Colors',
    description: 'Pick colors and get HEX, RGB, HSL, and CMYK codes.',
    path: '/tools/color-picker', icon: PaletteIcon, category: 'web',
  },
  {
    id: 'color-palette-generator', name: 'Color Palette Generator', shortName: 'Palettes',
    description: 'Generate beautiful color palettes and schemes.',
    path: '/tools/color-palette-generator', icon: PaletteIcon, category: 'web',
    new: true,
  },
  {
    id: 'color-mixer', name: 'Color Mixer', shortName: 'Mix Colors',
    description: 'Mix two colors together and see the result.',
    path: '/tools/color-mixer', icon: PaletteIcon, category: 'web',
    new: true,
  },
  {
    id: 'color-contrast-checker', name: 'Color Contrast Checker', shortName: 'Contrast',
    description: 'Check WCAG color contrast ratios for accessibility.',
    path: '/tools/color-contrast-checker', icon: Eye, category: 'web',
    new: true,
  },
  {
    id: 'color-blindness-simulator', name: 'Color Blindness Simulator', shortName: 'Color Blind',
    description: 'Simulate how colors appear to people with color blindness.',
    path: '/tools/color-blindness-simulator', icon: Eye, category: 'web',
    new: true,
  },
  {
    id: 'ip-information', name: 'IP Information', shortName: 'IP Info',
    description: 'Get details about your current IP address and location.',
    path: '/tools/ip-information', icon: Globe, category: 'web',
  },
  {
    id: 'user-agent-parser', name: 'User Agent Parser', shortName: 'UA Parse',
    description: 'Parse and analyze browser user agent strings.',
    path: '/tools/user-agent-parser', icon: Monitor, category: 'web',
    new: true,
  },
  {
    id: 'viewport-size-detector', name: 'Viewport Size Detector', shortName: 'Viewport',
    description: 'Detect your current viewport and screen dimensions.',
    path: '/tools/viewport-size-detector', icon: MonitorSmartphone, category: 'web',
    new: true,
  },
  {
    id: 'screen-resolution-detector', name: 'Screen Resolution Detector', shortName: 'Resolution',
    description: 'Detect your screen resolution and pixel density.',
    path: '/tools/screen-resolution-detector', icon: Monitor, category: 'web',
    new: true,
  },
  {
    id: 'device-info-detector', name: 'Device Info Detector', shortName: 'Device Info',
    description: 'Detect device type, browser, OS and capabilities.',
    path: '/tools/device-info-detector', icon: Smartphone, category: 'web',
    new: true,
  },
  {
    id: 'battery-status', name: 'Battery Status', shortName: 'Battery',
    description: 'Check your device battery level and charging status.',
    path: '/tools/battery-status', icon: BatteryCharging, category: 'web',
    new: true,
  },
  {
    id: 'network-speed-test', name: 'Network Speed Test', shortName: 'Speed Test',
    description: 'Test your download and upload speeds.',
    path: '/tools/network-speed-test', icon: Signal, category: 'web',
    new: true,
  },
  {
    id: 'latency-test', name: 'Latency Test', shortName: 'Ping',
    description: 'Measure network latency and response times.',
    path: '/tools/latency-test', icon: Signal, category: 'web',
    new: true,
  },
  {
    id: 'dns-lookup', name: 'DNS Lookup', shortName: 'DNS',
    description: 'Look up DNS records for any domain.',
    path: '/tools/dns-lookup', icon: Network, category: 'web',
    new: true,
  },
  {
    id: 'whois-lookup', name: 'WHOIS Lookup', shortName: 'WHOIS',
    description: 'Look up domain registration and ownership information.',
    path: '/tools/whois-lookup', icon: Globe2, category: 'web',
    new: true,
  },
  {
    id: 'http-headers-checker', name: 'HTTP Headers Checker', shortName: 'Headers',
    description: 'Inspect HTTP response headers of any URL.',
    path: '/tools/http-headers-checker', icon: FileCode, category: 'web',
    new: true,
  },
  {
    id: 'responsive-design-tester', name: 'Responsive Design Tester', shortName: 'Responsive',
    description: 'Test how your website looks at different screen sizes.',
    path: '/tools/responsive-design-tester', icon: MonitorSmartphone, category: 'web',
    new: true,
  },
  {
    id: 'page-load-time-tester', name: 'Page Load Time Tester', shortName: 'Load Time',
    description: 'Measure how fast web pages load.',
    path: '/tools/page-load-time-tester', icon: Timer, category: 'web',
    new: true,
  },

  // ============ Productivity ============
  {
    id: 'whatsapp-link-generator', name: 'WhatsApp Chat Link Generator', shortName: 'WhatsApp',
    description: 'Create a direct "click to chat" WhatsApp link with pre-filled messages.',
    path: '/tools/whatsapp-link-generator', icon: MessageCircle, category: 'productivity',
    featured: true, popular: true, new: false,
  },
  {
    id: 'qr-code-generator', name: 'QR Code Generator', shortName: 'QR Code',
    description: 'Turn a URL, text, phone number, email or WiFi login into a scannable QR code.',
    path: '/tools/qr-code-generator', icon: QrCode, category: 'productivity',
    featured: true, popular: true, new: false,
  },
  {
    id: 'countdown-timer', name: 'Countdown Timer', shortName: 'Timer',
    description: 'Set countdown timers for any duration with audio alerts.',
    path: '/tools/countdown-timer', icon: Timer, category: 'productivity',
    new: true,
  },
  {
    id: 'stopwatch', name: 'Stopwatch', shortName: 'Stopwatch',
    description: 'Precise stopwatch with lap recording functionality.',
    path: '/tools/stopwatch', icon: Timer, category: 'productivity',
    new: true,
  },
  {
    id: 'pomodoro-timer', name: 'Pomodoro Timer', shortName: 'Pomodoro',
    description: '25-minute work / 5-minute break timer for productivity.',
    path: '/tools/pomodoro-timer', icon: Timer, category: 'productivity',
    new: true,
  },
  {
    id: 'date-difference-calculator', name: 'Date Difference Calculator', shortName: 'Date Diff',
    description: 'Calculate the number of days between two dates.',
    path: '/tools/date-difference-calculator', icon: CalendarDays, category: 'productivity',
    new: true,
  },
  {
    id: 'date-addition-calculator', name: 'Date Addition Calculator', shortName: 'Add Days',
    description: 'Add or subtract days, weeks, months from any date.',
    path: '/tools/date-addition-calculator', icon: CalendarDays, category: 'productivity',
    new: true,
  },
  {
    id: 'world-clock', name: 'World Clock', shortName: 'Clocks',
    description: 'View current time across multiple time zones.',
    path: '/tools/world-clock', icon: Globe2, category: 'productivity',
    new: true,
  },
  {
    id: 'timezone-converter', name: 'Timezone Converter', shortName: 'Timezones',
    description: 'Convert times between different time zones.',
    path: '/tools/timezone-converter', icon: Clock, category: 'productivity',
    new: true,
  },
  {
    id: 'todo-list-generator', name: 'Todo List Maker', shortName: 'Todo List',
    description: 'Create and manage simple todo lists in your browser.',
    path: '/tools/todo-list-generator', icon: ListChecks, category: 'productivity',
    new: true,
  },
  {
    id: 'note-taking-app', name: 'Quick Notes', shortName: 'Notes',
    description: 'Simple note-taking app that saves to your browser.',
    path: '/tools/note-taking-app', icon: Pencil, category: 'productivity',
    new: true,
  },
  {
    id: 'habit-tracker', name: 'Habit Tracker', shortName: 'Habits',
    description: 'Track daily habits with a simple streak calendar.',
    path: '/tools/habit-tracker', icon: ListChecks, category: 'productivity',
    new: true,
  },
  {
    id: 'budget-tracker', name: 'Budget Tracker', shortName: 'Budget',
    description: 'Track income and expenses with visual summaries.',
    path: '/tools/budget-tracker', icon: DollarSign, category: 'productivity',
    new: true,
  },
  {
    id: 'expense-splitter', name: 'Expense Splitter', shortName: 'Split',
    description: 'Split expenses fairly among multiple people.',
    path: '/tools/expense-splitter', icon: DollarSign, category: 'productivity',
    new: true,
  },
  {
    id: 'invoice-generator', name: 'Invoice Generator', shortName: 'Invoice',
    description: 'Create professional invoices as printable PDFs.',
    path: '/tools/invoice-generator', icon: Receipt, category: 'productivity',
    new: true,
  },
  {
    id: 'meeting-cost-calculator', name: 'Meeting Cost Calculator', shortName: 'Meeting Cost',
    description: 'Calculate the true cost of meetings based on attendee salaries.',
    path: '/tools/meeting-cost-calculator', icon: DollarSign, category: 'productivity',
    new: true,
  },
  {
    id: 'word-of-the-day', name: 'Word of the Day', shortName: 'Word',
    description: 'Learn a new vocabulary word each day.',
    path: '/tools/word-of-the-day', icon: BookOpen, category: 'productivity',
    new: true,
  },
  {
    id: 'typing-speed-test', name: 'Typing Speed Test', shortName: 'Typing',
    description: 'Test your typing speed in words per minute.',
    path: '/tools/typing-speed-test', icon: Type, category: 'productivity',
    new: true,
  },
  {
    id: 'morse-code-converter', name: 'Morse Code Converter', shortName: 'Morse',
    description: 'Convert text to Morse code and vice versa.',
    path: '/tools/morse-code-converter', icon: Radio, category: 'productivity',
    new: true,
  },
  {
    id: 'text-to-morse', name: 'Text to Morse Code', shortName: 'Text → Morse',
    description: 'Encode text messages as Morse code.',
    path: '/tools/text-to-morse', icon: Radio, category: 'productivity',
    new: true,
  },
  {
    id: 'emoji-counter', name: 'Emoji Counter', shortName: 'Emojis',
    description: 'Count and analyze emoji usage in your text.',
    path: '/tools/emoji-counter', icon: Sparkles, category: 'productivity',
    new: true,
  },
  {
    id: 'random-picker', name: 'Random Picker', shortName: 'Picker',
    description: 'Randomly pick an item from a list of options.',
    path: '/tools/random-picker', icon: Shuffle, category: 'productivity',
    new: true,
  },
  {
    id: 'dice-roller', name: 'Dice Roller', shortName: 'Dice',
    description: 'Roll virtual dice with custom number of sides.',
    path: '/tools/dice-roller', icon: Dices, category: 'productivity',
    new: true,
  },
  {
    id: 'coin-flipper', name: 'Coin Flipper', shortName: 'Flip',
    description: 'Flip a virtual coin for random decisions.',
    path: '/tools/coin-flipper', icon: RefreshCw, category: 'productivity',
    new: true,
  },
  {
    id: 'decision-maker', name: 'Decision Maker', shortName: 'Decide',
    description: 'Let the tool make a random decision for you.',
    path: '/tools/decision-maker', icon: HelpCircle, category: 'productivity',
    new: true,
  },
  {
    id: 'boredom-reliever', name: 'Boredom Reliever', shortName: 'Fun Ideas',
    description: 'Get random activity suggestions when bored.',
    path: '/tools/boredom-reliever', icon: Lightbulb, category: 'productivity',
    new: true,
  },
  {
    id: 'name-generator', name: 'Name Generator', shortName: 'Names',
    description: 'Generate random names for characters, projects, or businesses.',
    path: '/tools/name-generator', icon: UserRound, category: 'productivity',
    new: true,
  },
  {
    id: 'username-generator', name: 'Username Generator', shortName: 'Username',
    description: 'Generate unique usernames with customizable styles.',
    path: '/tools/username-generator', icon: UserCheck, category: 'productivity',
    new: true,
  },
  {
    id: 'bio-generator', name: 'Bio Generator', shortName: 'Bio',
    description: 'Generate professional bios for social media profiles.',
    path: '/tools/bio-generator', icon: UserRound, category: 'productivity',
    new: true,
  },
  {
    id: 'email-subject-line-generator', name: 'Email Subject Line Generator', shortName: 'Subjects',
    description: 'Generate catchy email subject lines for better open rates.',
    path: '/tools/email-subject-line-generator', icon: Mail, category: 'productivity',
    new: true,
  },
  {
    id: 'hashtag-generator', name: 'Hashtag Generator', shortName: 'Hashtags',
    description: 'Generate relevant hashtags for social media posts.',
    path: '/tools/hashtag-generator', icon: Sparkles, category: 'productivity',
    new: true,
  },
  {
    id: 'link-shortener-preview', name: 'Link Preview Generator', shortName: 'Link Preview',
    description: 'Preview how your links will appear when shared.',
    path: '/tools/link-shortener-preview', icon: Link2, category: 'productivity',
    new: true,
  },
];

export const getToolById = (id) => TOOLS.find((tool) => tool.id === id);

export const getToolsByCategory = (categoryId) =>
  TOOLS.filter((tool) => tool.category === categoryId);

// Tools that should be nudged to the top of matching search results
// (e.g. flagship / trending tools). Add more ids here as needed.
export const PRIORITY_TOOL_IDS = ['online-code-editor'];

const norm = (s) => (s || '').toLowerCase();
const squash = (s) => norm(s).replace(/[^a-z0-9]/g, '');

// Scores a single tool against the search words. Returns -1 if the tool
// doesn't match every word (keeps the original AND-across-words behaviour).
function scoreTool(tool, words) {
  const name = norm(tool.name);
  const shortName = norm(tool.shortName);
  const description = norm(tool.description);
  const cat = CATEGORIES[tool.category];
  const categoryText = cat ? `${norm(cat.label)} ${norm(cat.shortDesc)}` : '';

  let score = 0;
  for (const word of words) {
    if (!word) continue;
    if (name === word || shortName === word) score += 100;
    else if (name.startsWith(word) || shortName.startsWith(word)) score += 60;
    else if (name.includes(word)) score += 35;
    else if (shortName.includes(word)) score += 30;
    else if (description.includes(word)) score += 12;
    else if (categoryText.includes(word)) score += 6;
    else return -1; // this word didn't match anything on the tool at all
  }

  if (PRIORITY_TOOL_IDS.includes(tool.id)) score += 20;
  if (tool.featured) score += 3;
  if (tool.popular) score += 2;

  return score;
}

// Ranked search: exact / prefix matches surface first, priority tools
// (like the Online Code Editor) get an extra boost within their matches.
export const searchTools = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return TOOLS;
  const words = q.split(/\s+/).filter(Boolean);

  return TOOLS
    .map((tool) => ({ tool, score: scoreTool(tool, words) }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.tool);
};

// Returns the single tool a query confidently identifies, or null.
// Used so that searching a tool's exact (or near-exact) name can open
// that tool's page directly instead of just filtering a list.
export const getBestMatch = (query) => {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return null;

  const results = searchTools(q);
  if (results.length === 0) return null;

  const top = results[0];
  const name = norm(top.name);
  const shortName = norm(top.shortName);
  const qSquashed = squash(q);

  const isConfident =
    name === q ||
    shortName === q ||
    name.startsWith(q) ||
    shortName.startsWith(q) ||
    q.startsWith(name) ||
    q.startsWith(shortName) ||
    (qSquashed.length >= 3 && (squash(top.name).includes(qSquashed) || qSquashed.includes(squash(top.shortName))));

  // If a second result scores just as high, it's ambiguous - don't auto-open.
  if (results.length > 1) {
    const second = results[1];
    const firstScore = scoreTool(top, q.split(/\s+/).filter(Boolean));
    const secondScore = scoreTool(second, q.split(/\s+/).filter(Boolean));
    if (firstScore === secondScore) return isConfident && name === q ? top : null;
  }

  return isConfident ? top : null;
};

