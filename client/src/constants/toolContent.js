// Tool2U — deep tool content
//
// Structured, tool-specific writing consumed by <ToolInfoSection>. Each
// entry is written for that one tool — no shared boilerplate paragraphs.
// Fields are optional; a tool without an entry here simply doesn't render
// the extended info section (see GenericTool / ToolPage).
//
// Shape:
// {
//   intro: string,
//   howTo: string[],
//   features: string[],
//   examples: { title: string, description?: string, code?: string }[],
//   useCases: { title: string, description: string }[],
//   tips: string[],
//   important: string,
//   faq: { question: string, answer: string }[],
// }

export const TOOL_CONTENT = {
  // ───────────────────────── Students ─────────────────────────
  'cgpa-calculator': {
    intro:
      'A CGPA (Cumulative Grade Point Average) tells you how you\u2019re performing across every semester combined, not just the current one. Instead of averaging percentages, universities weight each course by its credit hours, so a 3-credit course pulls your average more than a 1-credit course. This calculator does that weighting for you: enter each course\u2019s grade and credit hours, and it works out your semester GPA and running CGPA using the grading scale your university actually follows.',
    howTo: [
      'Pick your university or grading scale from the dropdown \u2014 this sets how letter grades map to grade points (a 4.0 scale treats an A differently than a 5.0 scale).',
      'Add a row for every course you\u2019re including, with its credit hours and the grade you received (or expect to receive).',
      'Use "Add course" for additional subjects, and remove any row you added by mistake.',
      'Read your semester GPA and cumulative CGPA in the results panel \u2014 both update as you edit.',
      'Copy the result if you need to paste it into a spreadsheet, transcript tracker, or scholarship application.',
    ],
    features: [
      'Supports multiple grading scales (4.0, 5.0, and 10.0-style systems) so it matches your actual institution.',
      'Weights each course correctly by credit hours instead of doing a flat average.',
      'Calculates both single-semester GPA and running CGPA in the same pass.',
      'Runs entirely in your browser \u2014 your grades are never uploaded anywhere.',
    ],
    examples: [
      {
        title: 'Two courses, different weights',
        description:
          'A 3-credit course with an A (4.0) and a 1-credit course with a C (2.0) doesn\u2019t average to 3.0. Weighted correctly: (3\u00d74.0 + 1\u00d72.0) \u00f7 4 = 3.5 \u2014 the heavier course pulls the average up more.',
      },
    ],
    useCases: [
      { title: 'Before result day', description: 'Estimate your semester GPA once you know (or predict) your grades, before the official transcript is issued.' },
      { title: 'Scholarship eligibility', description: 'Many scholarships set a minimum CGPA threshold \u2014 check where you stand before applying.' },
      { title: 'Course planning', description: 'Test how a strong or weak grade in an upcoming heavy-credit course would move your overall CGPA.' },
    ],
    tips: [
      'If a course was repeated, check whether your university replaces the old grade or averages both \u2014 that changes what you should enter.',
      'Enter credit hours exactly as listed on your course outline; a common mistake is mixing up contact hours with credit hours.',
    ],
    important:
      'This tool calculates using standard weighted-average formulas. Some universities apply their own rounding rules or exclude certain course types (like audits or pass/fail courses) from CGPA \u2014 always cross-check against your official transcript before relying on the number for anything formal.',
    faq: [
      { question: 'What\u2019s the difference between GPA and CGPA?', answer: 'GPA usually refers to a single semester\u2019s average, while CGPA is the cumulative average across every semester completed so far.' },
      { question: 'Does this work for a 10-point grading scale?', answer: 'Yes \u2014 select the matching scale from the university/grading-scale dropdown before entering your courses.' },
      { question: 'What if I don\u2019t know my exact grade yet?', answer: 'Enter your best estimate to see a projected CGPA \u2014 you can update it once the real grade is posted.' },
    ],
  },

  'gpa-calculator': {
    intro:
      'GPA (Grade Point Average) condenses every grade from a single term into one number by weighting each course by its credit hours. This calculator lets you add your courses, pick a grade for each, and get an accurate semester GPA instantly \u2014 useful whether you\u2019re checking your standing mid-semester or projecting your final grade before results are posted.',
    howTo: [
      'Add one row per course taken this semester.',
      'Enter the credit hours and the grade (or expected grade) for each.',
      'The GPA updates live as you edit rows \u2014 no submit button needed.',
      'Remove or adjust a row any time to test "what if I get a B instead of a B+" scenarios.',
    ],
    features: [
      'Real-time recalculation as you type \u2014 no need to click "calculate" after every change.',
      'Credit-hour weighting, so a 4-credit A counts more than a 1-credit A.',
      'Works for any number of courses in a single term.',
    ],
    examples: [
      {
        title: 'Projecting a target GPA',
        description:
          'If you\u2019ve already got grades for 4 of 5 courses, enter those first, then try different grades for the last course to see the minimum you need to hit a target GPA.',
      },
    ],
    useCases: [
      { title: 'Mid-semester check-in', description: 'See where you stand once a few assignments or exams are graded.' },
      { title: 'Deciding whether to retake a course', description: 'Compare your GPA with and without a specific low grade included.' },
    ],
    tips: [
      'If your university uses plus/minus grading (A-, B+, etc.), make sure the grade options reflect that \u2014 rounding A- to a flat A will overstate your GPA.',
    ],
    important:
      'GPA here means a single term\u2019s weighted average. If you want your average across multiple semesters, use the CGPA Calculator instead \u2014 the two aren\u2019t interchangeable.',
    faq: [
      { question: 'Can I calculate GPA for just a few courses?', answer: 'Yes, add as many or as few course rows as you need \u2014 there\u2019s no minimum.' },
      { question: 'Does it handle pass/fail courses?', answer: 'Pass/fail courses usually don\u2019t carry grade points at most institutions \u2014 leave them out of the calculation and check your university\u2019s policy.' },
    ],
  },

  'word-counter': {
    intro:
      'Word Counter tracks the numbers writers, students, and editors actually care about: word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time \u2014 all updating as you type or paste text in. It\u2019s built for anyone working against a limit, whether that\u2019s a 250-word scholarship essay, a 60-character meta title, or a 1500-word assignment.',
    howTo: [
      'Paste or type your text into the box.',
      'Counts update live above or beside the text area \u2014 no button to press.',
      'Use the reading-time estimate to gauge how long a piece will take an average reader to get through.',
      'Clear the box to start a fresh count for a new document.',
    ],
    features: [
      'Counts words, characters (with/without spaces), sentences, and paragraphs simultaneously.',
      'Reading time estimate based on average adult reading speed.',
      'Updates instantly as you type \u2014 no lag, no need to re-run anything.',
      'Handles long documents without slowing down, since everything runs locally.',
    ],
    examples: [
      { title: 'Meeting a strict word limit', description: 'Paste a draft essay to see exactly how many words over or under a 500-word limit you are, then trim accordingly.' },
      { title: 'Estimating a talk length', description: 'A 130-word-per-minute speaking pace roughly maps to reading time \u2014 use the estimate as a starting point for timing a speech.' },
    ],
    useCases: [
      { title: 'Students', description: 'Check assignment word counts before submission, since many universities penalize going over or under a limit.' },
      { title: 'Writers & bloggers', description: 'Track article length against SEO or editorial targets.' },
      { title: 'Social media managers', description: 'Verify a caption or bio fits within a platform\u2019s character limit.' },
    ],
    tips: [
      'Character-with-spaces count is the one most platforms (Twitter/X, meta descriptions, SMS) actually enforce \u2014 use that figure, not the without-spaces one, when checking a limit.',
      'Paragraph count is based on line breaks, so a single long paragraph split across the page by soft wrapping still counts as one.',
    ],
    important:
      'Sentence detection uses punctuation (periods, question marks, exclamation points) to split text, so abbreviations like "e.g." or "Dr." can occasionally be miscounted as sentence breaks in edge cases.',
    faq: [
      { question: 'Does it count words in other languages?', answer: 'Yes, it counts whitespace-separated words, which works for most languages that use spaces between words.' },
      { question: 'Is my text stored anywhere?', answer: 'No \u2014 counting happens entirely in your browser and nothing is sent to a server.' },
    ],
  },

  'citation-generator': {
    intro:
      'Citation Generator builds properly formatted references in APA, MLA, and Chicago style from the source details you provide \u2014 author, title, publisher, year, and so on. Formatting rules differ subtly between styles (punctuation, italics, author-name order), and getting them wrong is one of the most common reasons students lose easy marks on a bibliography.',
    howTo: [
      'Choose the citation style your instructor or publication requires (APA, MLA, or Chicago).',
      'Select the source type \u2014 book, journal article, or website \u2014 since each needs different fields.',
      'Fill in the author, title, year, publisher/source, and URL (for web sources).',
      'Copy the generated citation directly into your reference list or bibliography.',
    ],
    features: [
      'Covers the three most commonly required academic styles.',
      'Adjusts required fields based on source type (book, article, or website).',
      'Formats punctuation, capitalization, and italics per each style\u2019s official rules.',
    ],
    examples: [
      {
        title: 'Website source in APA',
        description:
          'Author last name, first initial, publication year in parentheses, page/article title, site name, and the URL \u2014 arranged in the exact order and punctuation APA requires.',
      },
    ],
    useCases: [
      { title: 'Research papers', description: 'Build a consistent reference list without memorizing each style\u2019s punctuation rules.' },
      { title: 'Group assignments', description: 'Keep citation formatting consistent when multiple students are contributing sources.' },
    ],
    tips: [
      'Double-check author name order \u2014 APA and Chicago use "Last, First," while in-text mentions use "First Last."',
      'For websites, include an access date if your style guide requires one for content that could change over time.',
    ],
    important:
      'Citation styles are updated periodically by their governing bodies (e.g. new APA editions). This tool follows the commonly taught current conventions, but always confirm against your institution\u2019s specific style guide for edge cases like reports, interviews, or social media sources.',
    faq: [
      { question: 'Which style should I use?', answer: 'It depends on your field \u2014 APA is common in social sciences, MLA in humanities/literature, and Chicago in history and some publishing contexts. Check your assignment brief.' },
      { question: 'Can I generate citations for a YouTube video or podcast?', answer: 'The tool focuses on books, articles, and websites; for less common source types, use the website format as a base and adjust manually.' },
    ],
  },

  // ───────────────────────── Developers ─────────────────────────
  'json-formatter': {
    intro:
      'JSON Formatter takes raw, minified, or messy JSON and reformats it with consistent indentation so it\u2019s actually readable \u2014 while also checking that it\u2019s valid. Nested API responses, config files, and log dumps often arrive as a single unreadable line; this turns that into properly indented, color-legible structure and flags syntax errors like missing commas or unclosed brackets.',
    howTo: [
      'Paste your JSON into the input box, or upload a .json file.',
      'Click Process to beautify it \u2014 the formatted, indented version appears in the output panel.',
      'If the JSON is invalid, an error message explains what\u2019s wrong (e.g. a trailing comma or missing quote).',
      'Copy the formatted result or download it as a file.',
    ],
    features: [
      'Consistent 2-space indentation for nested objects and arrays.',
      'Validates syntax and reports errors instead of failing silently.',
      'Handles deeply nested structures without truncating.',
      'Runs client-side, so large or sensitive payloads never leave your browser.',
    ],
    examples: [
      {
        title: 'Minified to readable',
        code: '{"user":{"id":1,"name":"Ali","active":true}}',
        description: 'becomes a properly indented object with each key on its own line, making it easy to scan for a specific field.',
      },
    ],
    useCases: [
      { title: 'Debugging API responses', description: 'Paste a raw response from your browser\u2019s network tab to quickly find the field you\u2019re looking for.' },
      { title: 'Reviewing config files', description: 'Format a compressed config before editing it, then minify again if the tool you\u2019re feeding it into needs compact JSON.' },
      { title: 'Teaching / documentation', description: 'Produce clean, readable JSON examples for tutorials or API docs.' },
    ],
    tips: [
      'JSON doesn\u2019t allow trailing commas or single quotes \u2014 if validation fails, those are the first two things to check.',
      'Keys must always be double-quoted strings; unquoted keys are valid in JavaScript object literals but not in strict JSON.',
    ],
    important:
      'This tool validates against strict JSON syntax (RFC 8259). JavaScript object literals that include comments, trailing commas, or unquoted keys will be flagged as invalid \u2014 that\u2019s expected behavior, not a bug.',
    faq: [
      { question: 'Can I minify JSON with this tool?', answer: 'Yes \u2014 use the dedicated JSON Minifier for the reverse operation, which strips whitespace for production payloads.' },
      { question: 'Is there a size limit?', answer: 'Very large files (tens of megabytes) may slow down your browser tab since formatting happens locally, but typical API responses and config files process instantly.' },
    ],
  },

  'json-to-csv': {
    intro:
      'JSON to CSV Converter turns an array of JSON objects into a spreadsheet-ready CSV file, mapping each object\u2019s keys to columns and each object to a row. It\u2019s the fastest way to get API data, exported records, or scraped data into Excel or Google Sheets without writing a script.',
    howTo: [
      'Paste a JSON array of objects, or upload a .json file.',
      'Click convert \u2014 the tool detects the columns from your objects\u2019 keys.',
      'Preview the resulting CSV in the output panel.',
      'Download the CSV file or copy it directly into a spreadsheet.',
    ],
    features: [
      'Automatically detects columns from object keys across the array.',
      'Handles nested values by flattening or stringifying them so no data is silently dropped.',
      'Produces a standard, comma-separated CSV compatible with Excel, Sheets, and Numbers.',
    ],
    examples: [
      {
        title: 'Array of user records',
        code: '[{"name":"Ali","age":22},{"name":"Sara","age":24}]',
        description: 'converts to a two-column CSV with "name" and "age" as headers and one row per object.',
      },
    ],
    useCases: [
      { title: 'Exporting API data', description: 'Pull a JSON response from an API and turn it into a spreadsheet for non-technical teammates.' },
      { title: 'Data analysis prep', description: 'Convert scraped or exported JSON into CSV so it can be loaded into Excel, Sheets, or a BI tool.' },
    ],
    tips: [
      'If your JSON objects have inconsistent keys (some records missing fields others have), those cells will simply appear empty in the CSV \u2014 check the header row to confirm nothing was mislabeled.',
      'For deeply nested JSON, flatten it first (or expect nested objects to appear as stringified JSON in a single cell).',
    ],
    important:
      'The input must be a JSON array of objects (not a single object or an array of primitives) for column detection to work correctly.',
    faq: [
      { question: 'Can I convert a single JSON object instead of an array?', answer: 'Wrap it in square brackets ([ ]) first to make it a one-item array \u2014 the converter expects an array.' },
      { question: 'What happens to nested objects/arrays inside a record?', answer: 'They\u2019re converted to a JSON string within that cell so no data is lost, though you may want to flatten them manually for deeper analysis.' },
    ],
  },

  'json-validator': {
    intro:
      'JSON Validator checks whether a block of JSON is syntactically correct according to the JSON specification, and if it isn\u2019t, tells you roughly where the problem is \u2014 an unclosed brace, a missing comma, a stray quote. It\u2019s the fastest way to catch a syntax error before it breaks a build, an API call, or a config file.',
    howTo: [
      'Paste the JSON you want to check into the input box.',
      'Click validate \u2014 you\u2019ll get a clear "Valid JSON" confirmation or a specific error message.',
      'Fix the reported issue and re-run until validation passes.',
    ],
    features: [
      'Strict validation against the JSON specification (RFC 8259).',
      'Clear error feedback instead of a generic "invalid" message.',
      'Works on both compact and formatted JSON.',
    ],
    examples: [
      {
        title: 'Common invalid JSON',
        code: "{ name: 'Ali', }",
        description: 'fails validation for two reasons: unquoted keys and a trailing comma, both disallowed in strict JSON.',
      },
    ],
    useCases: [
      { title: 'Pre-deploy config checks', description: 'Validate a config file before pushing it, so a malformed file doesn\u2019t crash a build.' },
      { title: 'API debugging', description: 'Confirm whether a broken integration is due to invalid JSON being sent or a logic error elsewhere.' },
    ],
    tips: [
      'If you\u2019re validating JavaScript object literals rather than strict JSON (e.g. from source code), expect unquoted keys and comments to fail \u2014 that\u2019s correct behavior for JSON validation.',
    ],
    important:
      'Validation checks syntax only, not schema \u2014 it confirms the JSON is well-formed, not that it matches a particular structure your application expects.',
    faq: [
      { question: 'Does it check against a schema?', answer: 'No, this checks pure JSON syntax validity. For schema validation you\u2019d need a JSON Schema-aware tool.' },
    ],
  },

  'regex-tester': {
    intro:
      'Regex Tester lets you write a regular expression and test it against sample text in real time, highlighting matches as you type. Regular expressions are notoriously easy to get subtly wrong \u2014 this gives immediate visual feedback instead of the trial-and-error of running code repeatedly.',
    howTo: [
      'Type your regular expression pattern into the pattern field.',
      'Set any flags you need (e.g. global, case-insensitive, multiline).',
      'Paste your test string into the text area.',
      'Matches are highlighted live, with capture groups shown separately if present.',
    ],
    features: [
      'Live match highlighting as you edit the pattern or test string.',
      'Supports common regex flags (global, case-insensitive, multiline).',
      'Shows capture groups separately from the full match.',
    ],
    examples: [
      {
        title: 'Matching an email address',
        code: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        description: 'matches standard email formats \u2014 test it against a block of text containing several addresses to confirm it catches all of them without false positives.',
      },
    ],
    useCases: [
      { title: 'Form validation', description: 'Build and test a pattern for phone numbers, postal codes, or emails before dropping it into your validation logic.' },
      { title: 'Log/text parsing', description: 'Confirm a pattern correctly extracts the fields you need from structured log lines.' },
    ],
    tips: [
      'Start narrow and broaden gradually \u2014 a pattern that\u2019s too permissive will silently match things you didn\u2019t intend.',
      'Remember that `.` matches any character except a newline by default; enable the multiline/dotall flag if your text spans multiple lines.',
    ],
    important:
      'JavaScript\u2019s regex engine is used here, which has minor syntax differences from PCRE (used in PHP, Python\u2019s re module has its own variant too). If you\u2019re writing the pattern for another language, double-check syntax like lookbehind support before relying on it exactly as-is.',
    faq: [
      { question: 'Why isn\u2019t my pattern matching anything?', answer: 'Check that the global flag is enabled if you expect multiple matches, and confirm special characters like `.` or `(` are escaped if you mean them literally.' },
    ],
  },

  'html-formatter': {
    intro:
      'HTML Formatter takes cramped or minified HTML and reformats it with consistent indentation so nested tags are easy to follow. Whether you\u2019re inspecting a page\u2019s source, cleaning up exported markup, or reviewing a teammate\u2019s snippet, readable indentation makes structural mistakes \u2014 like an unclosed div \u2014 far easier to spot.',
    howTo: [
      'Paste your HTML into the input box.',
      'Click format \u2014 the output panel shows properly indented markup with nested elements visually stepped in.',
      'Copy the formatted HTML or download it as a file.',
    ],
    features: [
      'Consistent indentation for nested tags, attributes preserved as written.',
      'Handles full documents or isolated snippets.',
      'Runs locally, so markup containing sensitive content never leaves your browser.',
    ],
    examples: [
      {
        title: 'Single-line markup',
        code: '<div><p>Hello</p><span>World</span></div>',
        description: 'becomes three clearly indented lines, making the parent-child relationship between the div, p, and span immediately visible.',
      },
    ],
    useCases: [
      { title: 'Reviewing exported markup', description: 'Clean up HTML exported from a CMS or email builder before editing it by hand.' },
      { title: 'Debugging layout issues', description: 'Indented markup makes it much easier to spot an unclosed tag causing a layout to break.' },
    ],
    tips: [
      'Formatting doesn\u2019t validate HTML correctness \u2014 pair it with a validator if you need to confirm the markup itself is spec-compliant, not just tidy.',
    ],
    important:
      'This reformats existing markup; it doesn\u2019t rewrite deprecated tags or fix accessibility issues. Use it for readability, not as an HTML linter.',
    faq: [
      { question: 'Will it fix broken HTML?', answer: 'It reformats indentation but doesn\u2019t repair structurally broken markup like mismatched tags \u2014 fix those manually first.' },
    ],
  },

  // ───────────────────────── Text ─────────────────────────
  'case-converter': {
    intro:
      'Case Converter switches text between UPPERCASE, lowercase, Title Case, and Sentence case instantly. It\u2019s a small utility that saves the tedium of manually retyping a heading, a list of names, or a pasted block of shouty all-caps text into the case you actually need.',
    howTo: [
      'Paste or type your text into the input box.',
      'Choose the target case \u2014 upper, lower, title, or sentence.',
      'The converted text appears immediately; copy it with one click.',
    ],
    features: [
      'Instant conversion with no processing delay.',
      'Covers the four most commonly needed cases.',
      'Preserves punctuation and spacing exactly \u2014 only letter casing changes.',
    ],
    examples: [
      { title: 'Title case', description: '"the quick brown fox" becomes "The Quick Brown Fox" \u2014 useful for headings and titles.' },
      { title: 'Sentence case', description: 'A pasted block of ALL CAPS TEXT becomes normally capitalized sentences, useful for cleaning up text copied from PDFs or old documents.' },
    ],
    useCases: [
      { title: 'Cleaning pasted text', description: 'Fix text copied from a source that used inconsistent or all-caps formatting.' },
      { title: 'Preparing headings', description: 'Quickly title-case a page heading or article title.' },
    ],
    tips: [
      'Title case here capitalizes the first letter of every word, including short connector words \u2014 check against your specific style guide (e.g. AP style lowercases some short words) if you need editorial-grade title casing.',
    ],
    important:
      'Sentence case detects sentence boundaries using punctuation, so unusual formatting (no periods, heavy abbreviation use) can occasionally produce unexpected capitalization.',
    faq: [
      { question: 'Does it support other alphabets?', answer: 'Case conversion works for scripts with distinct upper/lower case forms, primarily Latin-based alphabets \u2014 scripts without case distinctions (like Arabic or Urdu) are unaffected.' },
    ],
  },

  'slug-generator': {
    intro:
      'Slug Generator converts a title or phrase into a clean, URL-safe slug \u2014 lowercase, hyphen-separated, with special characters and extra spaces stripped out. A good slug keeps URLs readable and consistent, which matters both for users sharing a link and for search engines parsing your page structure.',
    howTo: [
      'Type or paste your title into the input box.',
      'The slug is generated automatically \u2014 lowercase, spaces replaced with hyphens, special characters removed.',
      'Copy the slug to use in your CMS, blog platform, or routing config.',
    ],
    features: [
      'Automatically lowercases and hyphenates text.',
      'Strips punctuation, accented characters, and other symbols that don\u2019t belong in a URL.',
      'Collapses multiple spaces or hyphens into a single hyphen.',
    ],
    examples: [
      { title: 'Blog post title', description: '"10 Tips for Better Sleep!" becomes "10-tips-for-better-sleep" \u2014 clean, readable, and safe to use directly in a URL path.' },
    ],
    useCases: [
      { title: 'Blogging platforms', description: 'Generate a consistent slug for a new post before publishing.' },
      { title: 'E-commerce product URLs', description: 'Turn a product name into a clean URL segment.' },
    ],
    tips: [
      'Keep slugs reasonably short \u2014 very long slugs get truncated in search results and are harder to share verbally.',
      'Avoid stop words like "the" or "and" in long titles if you want a tighter, more scannable slug \u2014 you may need to trim these manually.',
    ],
    important:
      'The generated slug is a starting point; some platforms (and SEO best practice) recommend keeping slugs stable once published, since changing a URL after indexing can affect search rankings unless a redirect is set up.',
    faq: [
      { question: 'Does it handle non-English characters?', answer: 'Accented and non-Latin characters are transliterated or stripped where possible to keep the slug URL-safe.' },
    ],
  },

  // ───────────────────────── Security ─────────────────────────
  'password-generator': {
    intro:
      'Password Generator creates strong, random passwords using your browser\u2019s cryptographically secure random number generator \u2014 not a predictable pseudo-random function. You control the length and which character types (uppercase, lowercase, numbers, symbols) are included, so you can match any site\u2019s specific password rules while keeping entropy high.',
    howTo: [
      'Set your desired password length using the slider or input.',
      'Toggle which character types to include \u2014 uppercase, lowercase, numbers, symbols.',
      'Click generate to create a new password; regenerate as many times as you like.',
      'Copy the password directly into your password manager or the site you\u2019re registering on.',
    ],
    features: [
      'Uses the Web Crypto API for cryptographically secure randomness, not Math.random().',
      'Adjustable length and character-set composition.',
      'Generates instantly, with no password ever transmitted anywhere.',
    ],
    examples: [
      { title: '16-character password with all sets enabled', description: 'produces something like "qT7!kM2$vLp9#zRw" \u2014 long enough and varied enough to resist both dictionary and brute-force attacks for the foreseeable future.' },
    ],
    useCases: [
      { title: 'New account signups', description: 'Generate a unique password for every account instead of reusing one across sites.' },
      { title: 'Meeting specific password policies', description: 'Adjust length/character rules to match a site that requires, say, a minimum of one symbol and 12 characters.' },
    ],
    tips: [
      'Longer beats more complex: a 16-character password with just letters and numbers is generally stronger than an 8-character one stuffed with symbols.',
      'Use a password manager to store generated passwords \u2014 memorizing a unique strong password per site isn\u2019t realistic.',
    ],
    important:
      'Password strength depends on both randomness and length. Avoid reusing a generated password across multiple accounts, and avoid saving passwords in plain text files.',
    faq: [
      { question: 'Is the password sent to a server?', answer: 'No \u2014 generation happens locally in your browser using the Web Crypto API, and nothing is transmitted.' },
      { question: 'Why avoid excluding symbols?', answer: 'Removing character types reduces the total possible combinations, making the password somewhat easier to brute-force at a given length \u2014 include as many types as the target site allows.' },
    ],
  },

  'uuid-generator': {
    intro:
      'UUID Generator creates version-4 universally unique identifiers \u2014 128-bit random values formatted as the standard 8-4-4-4-12 hex string. UUIDs are used throughout software as unique keys for database rows, API resources, and session tokens because the odds of two randomly generated UUIDs colliding are astronomically small.',
    howTo: [
      'Click generate to produce a new UUID.',
      'Generate multiple at once if you need a batch for seeding test data.',
      'Copy the UUID for use in your code, database, or config.',
    ],
    features: [
      'Generates standards-compliant version-4 (random) UUIDs.',
      'Batch generation for when you need several at once.',
      'No server round-trip \u2014 generated instantly in-browser.',
    ],
    examples: [
      { title: 'Sample UUID', code: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'the standard 36-character format: 32 hex digits split into groups of 8-4-4-4-12 by hyphens.' },
    ],
    useCases: [
      { title: 'Database primary keys', description: 'Use UUIDs instead of sequential integers to avoid exposing record counts or predictable IDs.' },
      { title: 'Test data seeding', description: 'Generate a batch of unique IDs for populating a development database.' },
      { title: 'API resource identifiers', description: 'Assign a unique, non-guessable ID to a new resource created via an API.' },
    ],
    tips: [
      'Version-4 UUIDs are random, not sequential \u2014 if you need IDs that sort chronologically, look into ULID or a timestamp-prefixed alternative instead.',
    ],
    important:
      'While collisions are extremely unlikely, UUIDs aren\u2019t cryptographically guaranteed unique \u2014 for security-critical tokens (like session secrets), use a dedicated secure token generator instead.',
    faq: [
      { question: 'What UUID version does this generate?', answer: 'Version 4 \u2014 fully random, the most commonly used version for general-purpose unique identifiers.' },
    ],
  },

  'md5-generator': {
    intro:
      'MD5 Generator computes the MD5 hash of any text you enter \u2014 a fixed 32-character hexadecimal fingerprint of the input. It\u2019s useful for checksums and quick data-integrity comparisons, though MD5 itself is considered cryptographically broken and should not be used to protect passwords or sensitive data.',
    howTo: [
      'Type or paste the text you want to hash.',
      'The MD5 hash is generated instantly below.',
      'Copy the hash for comparison or documentation purposes.',
    ],
    features: [
      'Instant client-side MD5 hashing \u2014 your input text never leaves your browser.',
      'Produces the standard 32-character hexadecimal digest.',
    ],
    examples: [
      { title: 'Hashing a simple string', code: 'hello \u2192 5d41402abc4b2a76b9719d911017c592', description: 'the same input always produces the same MD5 hash, which is what makes it useful for checksums and duplicate detection.' },
    ],
    useCases: [
      { title: 'File integrity checks', description: 'Compare an MD5 checksum against a published value to confirm a downloaded file wasn\u2019t corrupted or tampered with in transit.' },
      { title: 'Quick duplicate detection', description: 'Hash chunks of text or data to spot exact duplicates without comparing full content.' },
    ],
    tips: [
      'Never use MD5 to store passwords \u2014 it\u2019s fast to compute, which makes it easy to brute-force, and known collision attacks exist. Use bcrypt or a similar purpose-built password hash instead.',
    ],
    important:
      'MD5 is suitable for non-security checksums (verifying a file wasn\u2019t corrupted) but is not considered secure for cryptographic purposes like password storage or digital signatures. Use SHA-256 or bcrypt where security matters.',
    faq: [
      { question: 'Is MD5 safe for storing passwords?', answer: 'No \u2014 MD5 is fast and has known collision vulnerabilities, making it unsuitable for password storage. Use the Bcrypt Hash Generator instead.' },
      { question: 'Why does the same input always produce the same hash?', answer: 'MD5 is deterministic \u2014 that\u2019s exactly what makes it useful for checksums, since the same file or text always yields the same fingerprint.' },
    ],
  },

  // ───────────────────────── Image ─────────────────────────
  'image-compressor': {
    intro:
      'Image Compressor reduces a photo or graphic\u2019s file size by re-encoding it with a lower quality setting or optimized compression, while keeping visual quality close to the original. Smaller images mean faster page loads, less storage, and quicker uploads \u2014 especially valuable for websites where image weight is often the single biggest factor in load time.',
    howTo: [
      'Upload the image you want to compress.',
      'Adjust the quality/compression level and preview the result.',
      'Compare the before/after file size shown alongside the preview.',
      'Download the compressed image once you\u2019re happy with the size-versus-quality tradeoff.',
    ],
    features: [
      'Adjustable compression level so you can balance file size against visual quality.',
      'Before/after file size comparison shown directly in the interface.',
      'Processing happens in your browser \u2014 images aren\u2019t uploaded to a server.',
    ],
    examples: [
      { title: 'Typical savings', description: 'A 3MB photo straight off a phone camera often compresses down to 300\u2013600KB with minimal visible quality loss at web display sizes.' },
    ],
    useCases: [
      { title: 'Website performance', description: 'Compress hero images and thumbnails before uploading to keep page load times fast.' },
      { title: 'Email attachments', description: 'Shrink a photo below an email provider\u2019s attachment size limit.' },
      { title: 'Storage management', description: 'Reduce the size of a large photo library without a separate desktop app.' },
    ],
    tips: [
      'For photos, moderate compression (quality around 70\u201380%) is usually visually indistinguishable from the original at normal viewing sizes but cuts file size substantially.',
      'For images with sharp text or line art, compress more conservatively \u2014 aggressive compression introduces visible artifacts around hard edges.',
    ],
    important:
      'Compression is lossy for JPEG-style output \u2014 quality reduction is generally not reversible. Keep your original file if you might need full quality again later.',
    faq: [
      { question: 'Does compressing reduce image dimensions too?', answer: 'No, compression reduces file size at the same dimensions by adjusting quality/encoding \u2014 use the Image Resizer if you also need smaller dimensions.' },
      { question: 'Is my photo uploaded anywhere?', answer: 'No \u2014 compression happens locally in your browser using the Canvas API.' },
    ],
  },

  'image-resizer': {
    intro:
      'Image Resizer changes an image\u2019s pixel dimensions \u2014 shrinking a large photo down for web use, or scaling an image up to fit a specific size requirement. Getting dimensions right matters for everything from social media banners with fixed size specs to product photos that need to match a template.',
    howTo: [
      'Upload the image you want to resize.',
      'Enter your target width and/or height, or choose a preset size.',
      'Keep "maintain aspect ratio" on to avoid stretching or squashing the image, unless you specifically need an exact different ratio.',
      'Preview the result and download the resized file.',
    ],
    features: [
      'Resize by exact pixel dimensions or common presets.',
      'Optional aspect-ratio lock to prevent distortion.',
      'Runs entirely client-side with instant preview.',
    ],
    examples: [
      { title: 'Social banner sizing', description: 'Resize a photo to a platform\u2019s specific cover-image dimensions before uploading, avoiding an awkward auto-crop.' },
    ],
    useCases: [
      { title: 'Social media graphics', description: 'Match exact dimensions required by a platform\u2019s profile photo, banner, or post image spec.' },
      { title: 'Web optimization', description: 'Scale a large source photo down to the actual display size needed on a page, avoiding wasted bandwidth.' },
    ],
    tips: [
      'Scaling an image up beyond its original resolution will make it blurrier \u2014 resizing works best for shrinking, not enlarging.',
      'If you need a specific aspect ratio different from the original, crop first, then resize, rather than stretching the whole image.',
    ],
    important:
      'Resizing changes pixel dimensions only; it doesn\u2019t change the image format. Use a converter tool separately if you also need to change file type (e.g. PNG to JPG).',
    faq: [
      { question: 'Will resizing distort my image?', answer: 'Only if aspect ratio lock is off and your new width/height don\u2019t match the original ratio \u2014 keep the lock on to avoid stretching.' },
    ],
  },

  // ───────────────────────── PDF ─────────────────────────
  'merge-pdf': {
    intro:
      'Merge PDF combines multiple PDF files into a single document, in the order you choose. It\u2019s the tool you reach for when you\u2019ve got a scanned cover page, a report, and an appendix as three separate files that need to become one submission.',
    howTo: [
      'Upload the PDF files you want to combine.',
      'Reorder them by dragging into the sequence you want in the final document.',
      'Click merge to combine them into a single PDF.',
      'Download the merged file.',
    ],
    features: [
      'Combine any number of PDF files into one.',
      'Drag-to-reorder before merging, so page order matches exactly what you need.',
      'Processing happens locally \u2014 documents aren\u2019t uploaded to a server.',
    ],
    examples: [
      { title: 'Combining a report package', description: 'A cover letter, main report, and appendix \u2014 three separate PDFs \u2014 become a single file ready to submit or email as one attachment.' },
    ],
    useCases: [
      { title: 'Job applications', description: 'Combine a cover letter, resume, and portfolio into a single PDF for submission.' },
      { title: 'Academic submissions', description: 'Merge a title page, essay, and reference list into one document as required by many submission portals.' },
      { title: 'Scanned document assembly', description: 'Combine individually scanned pages into a complete, correctly ordered document.' },
    ],
    tips: [
      'Check the page order preview carefully before merging \u2014 fixing order after the fact means re-uploading and starting again.',
    ],
    important:
      'Merging preserves each source PDF\u2019s original content and formatting; it doesn\u2019t compress or otherwise alter the files beyond combining them.',
    faq: [
      { question: 'Is there a limit to how many PDFs I can merge?', answer: 'You can merge as many as your browser can comfortably handle in memory \u2014 for very large batches, consider merging in smaller groups first.' },
    ],
  },

  'compress-pdf': {
    intro:
      'Compress PDF reduces a PDF\u2019s file size, primarily by optimizing embedded images and removing redundant data, while keeping the document\u2019s text and layout intact. It\u2019s especially useful for PDFs full of scanned pages or high-resolution images, which tend to bloat file size far more than text-only documents.',
    howTo: [
      'Upload the PDF you want to compress.',
      'Choose a compression level based on how much you\u2019re willing to trade file size for image quality.',
      'Preview the resulting file size reduction.',
      'Download the compressed PDF.',
    ],
    features: [
      'Reduces file size primarily by optimizing embedded images.',
      'Preserves text, layout, and document structure.',
      'Runs in-browser, keeping document content private.',
    ],
    examples: [
      { title: 'Scanned document', description: 'A 20-page scanned PDF at 15MB can often compress to a few megabytes once embedded page images are re-encoded, with text remaining perfectly legible.' },
    ],
    useCases: [
      { title: 'Email attachment limits', description: 'Shrink a PDF below a recipient\u2019s or email provider\u2019s attachment size cap.' },
      { title: 'Upload portals with size limits', description: 'Meet a job application or submission portal\u2019s maximum file size requirement.' },
    ],
    tips: [
      'If the PDF is mostly text with few images, compression gains will be smaller \u2014 the biggest wins come from documents heavy with scanned pages or photos.',
    ],
    important:
      'Higher compression levels can visibly reduce image quality within the PDF. If the document contains fine print or detailed diagrams, preview at your chosen level before finalizing.',
    faq: [
      { question: 'Does compression affect the text content?', answer: 'No, text remains fully intact and selectable \u2014 compression targets embedded images and redundant data, not the text layer.' },
    ],
  },

  // ───────────────────────── SEO ─────────────────────────
  'meta-tag-generator': {
    intro:
      'Meta Tag Generator builds the HTML meta tags that control how a page appears in search results and when shared on social media \u2014 title, description, and Open Graph tags. Getting these right directly affects click-through rate from search results and how a link preview looks when shared on WhatsApp, Facebook, or LinkedIn.',
    howTo: [
      'Enter your page title, meta description, and target keywords.',
      'Fill in Open Graph fields (title, description, image URL) for social sharing previews.',
      'Copy the generated tags into your page\u2019s <head> section.',
    ],
    features: [
      'Generates title, meta description, and Open Graph tags together.',
      'Character-count guidance so titles and descriptions aren\u2019t truncated in search results.',
      'Ready-to-paste HTML output.',
    ],
    examples: [
      {
        title: 'Basic output',
        code: '<title>Page Title</title>\n<meta name="description" content="A concise, compelling summary of the page." />',
        description: 'the minimum tags every indexable page should have, generated with your specific content filled in.',
      },
    ],
    useCases: [
      { title: 'New page launches', description: 'Generate consistent, correctly formatted meta tags before publishing a new page.' },
      { title: 'Social share previews', description: 'Set Open Graph tags so a shared link shows the right title, description, and image instead of a blank or mismatched preview.' },
    ],
    tips: [
      'Keep titles under roughly 60 characters and descriptions under roughly 155\u2013160 characters to avoid truncation in Google\u2019s search results.',
      'Write descriptions that summarize the page\u2019s value, not just repeat keywords \u2014 the description influences click-through rate, not rankings directly.',
    ],
    important:
      'Meta tags influence how search engines and social platforms display and understand your page, but they are only one part of SEO \u2014 content quality, site structure, and backlinks matter significantly too.',
    faq: [
      { question: 'Do meta keywords still matter for SEO?', answer: 'No, major search engines have not used the meta keywords tag for ranking in years \u2014 focus effort on title, description, and content quality instead.' },
    ],
  },

  'robots-txt-generator': {
    intro:
      'Robots.txt Generator creates the robots.txt file that tells search engine crawlers which parts of your site they\u2019re allowed to access. It sits at your domain\u2019s root (example.com/robots.txt) and is one of the first things well-behaved crawlers check before indexing your site.',
    howTo: [
      'Specify which user-agents (crawlers) the rules apply to \u2014 or use * for all.',
      'Add Allow/Disallow rules for the paths you want to control.',
      'Optionally add your sitemap URL so crawlers can find it directly.',
      'Copy the generated file content into a robots.txt file at your site\u2019s root.',
    ],
    features: [
      'Builds standards-compliant Allow/Disallow rules per user-agent.',
      'Supports adding a sitemap reference.',
      'Produces ready-to-upload file content.',
    ],
    examples: [
      {
        title: 'Blocking an admin path',
        code: 'User-agent: *\nDisallow: /admin/\nSitemap: https://example.com/sitemap.xml',
        description: 'tells all crawlers to skip the /admin/ path while pointing them to the sitemap for everything else.',
      },
    ],
    useCases: [
      { title: 'Protecting private sections', description: 'Prevent crawlers from indexing admin panels, staging areas, or internal search result pages.' },
      { title: 'Guiding crawl budget', description: 'Steer crawlers away from low-value pages so they spend more time indexing your important content.' },
    ],
    tips: [
      'robots.txt is a request, not an enforcement mechanism \u2014 well-behaved crawlers respect it, but it doesn\u2019t prevent access outright, so don\u2019t rely on it to protect genuinely sensitive content.',
    ],
    important:
      'A misconfigured Disallow rule can accidentally block your entire site from being indexed. Double-check paths carefully, especially a lone "Disallow: /" which blocks everything.',
    faq: [
      { question: 'Does robots.txt stop pages from appearing in search results entirely?', answer: 'Not necessarily \u2014 a disallowed page can still appear in search results (without a description) if it\u2019s linked from elsewhere. Use a noindex meta tag for guaranteed exclusion.' },
    ],
  },

  // ───────────────────────── Calculators ─────────────────────────
  'age-calculator': {
    intro:
      'Age Calculator works out exact age in years, months, and days from a birth date, along with totals in days, hours, and minutes. It handles the fiddly parts \u2014 varying month lengths and leap years \u2014 that make manual date arithmetic error-prone.',
    howTo: [
      'Enter your date of birth.',
      'The calculator instantly shows your age in years, months, and days as of today.',
      'Total days, hours, and minutes lived are shown alongside for reference.',
    ],
    features: [
      'Accounts for varying month lengths and leap years automatically.',
      'Shows age broken down by years/months/days as well as running totals.',
      'Updates instantly with no page reload.',
    ],
    examples: [
      { title: 'Age in multiple units', description: 'Someone born on 2000-05-15 checking today sees both a "years, months, days" breakdown and a total-days figure \u2014 useful for milestones like "10,000 days old."' },
    ],
    useCases: [
      { title: 'Eligibility checks', description: 'Confirm exact age for eligibility requirements tied to a specific date (visas, exams, competitions).' },
      { title: 'Milestone tracking', description: 'Find out exactly how many days old you or someone else is for a birthday or anniversary.' },
    ],
    tips: [
      'For eligibility cutoffs (e.g. "must be 18 by X date"), check the exact date carefully \u2014 the day of the birthday itself usually counts as the day the age changes.',
    ],
    important:
      'Calculations use standard calendar rules; results are as accurate as the birth date you enter.',
    faq: [
      { question: 'Does it account for leap years?', answer: 'Yes, the calculation uses actual calendar dates, which correctly accounts for leap years and varying month lengths.' },
    ],
  },

  'percentage-calculator': {
    intro:
      'Percentage Calculator handles the handful of percentage calculations people actually need day to day: finding what percentage one number is of another, calculating a percentage increase or decrease, and finding the result of applying a percentage to a value.',
    howTo: [
      'Choose the type of calculation you need (e.g. "X is what % of Y", or "increase X by Y%").',
      'Enter your numbers into the relevant fields.',
      'The result updates instantly.',
    ],
    features: [
      'Covers the most common percentage calculation types in one tool.',
      'Instant results with no need to remember the underlying formula.',
    ],
    examples: [
      { title: 'Percentage of a total', description: '45 out of 60 is 75% \u2014 useful for grading, survey results, or any "part of a whole" question.' },
      { title: 'Percentage increase', description: 'A price rising from Rs. 2,000 to Rs. 2,300 is a 15% increase \u2014 handy for tracking price changes or salary raises.' },
    ],
    useCases: [
      { title: 'Grading and scores', description: 'Convert raw marks into a percentage score.' },
      { title: 'Price comparisons', description: 'Work out a discount percentage or a price increase between two values.' },
      { title: 'Budgeting', description: 'Calculate what percentage of income a specific expense represents.' },
    ],
    tips: [
      'Percentage increase and percentage difference aren\u2019t the same thing \u2014 increase is always relative to the starting value, so a 50% increase followed by a 50% decrease doesn\u2019t return you to the original number.',
    ],
    important:
      'Results are calculated using standard percentage formulas; for financial calculations involving compounding over time, use the Compound Interest Calculator instead.',
    faq: [
      { question: 'How do I calculate a discount?', answer: 'Use the "decrease by %" calculation \u2014 enter the original price and the discount percentage to get the final price.' },
    ],
  },

  'bmi-calculator': {
    intro:
      'BMI Calculator computes Body Mass Index from your height and weight \u2014 a simple screening figure (weight in kg divided by height in meters squared) used widely as a rough population-level indicator of whether weight falls in an underweight, normal, overweight, or obese range.',
    howTo: [
      'Enter your height and weight (metric or imperial, depending on the unit toggle).',
      'BMI and the corresponding category are calculated instantly.',
    ],
    features: [
      'Supports both metric and imperial units.',
      'Shows the standard BMI category alongside the numeric result.',
    ],
    examples: [
      { title: 'Sample calculation', description: 'A person at 70kg and 1.75m has a BMI of 70 \u00f7 (1.75\u00b2) \u2248 22.9, which falls in the "normal weight" range under standard classifications.' },
    ],
    useCases: [
      { title: 'General health tracking', description: 'Get a quick reference point as part of broader health monitoring.' },
      { title: 'Fitness goal setting', description: 'Use alongside other measurements when setting weight-related fitness targets.' },
    ],
    tips: [
      'BMI doesn\u2019t distinguish muscle from fat, so athletes and very muscular individuals often show a "high" BMI despite low body fat \u2014 treat it as one data point, not a complete health picture.',
    ],
    important:
      'BMI is a general screening tool, not a diagnostic measure. It doesn\u2019t account for muscle mass, bone density, age, or sex differences in body composition. For a full health assessment, consult a healthcare professional rather than relying on BMI alone.',
    faq: [
      { question: 'Is BMI accurate for everyone?', answer: 'No \u2014 it\u2019s a population-level screening tool and can be misleading for athletes, older adults, pregnant women, and people with very high or low muscle mass.' },
    ],
  },

  'unit-converter': {
    intro:
      'Unit Converter switches values between common measurement units \u2014 length, weight, temperature, volume, and more \u2014 without needing to remember conversion factors. Pick your source and target units, enter a value, and get an instant, accurate result.',
    howTo: [
      'Select the category of measurement (length, weight, temperature, etc.).',
      'Choose your "from" and "to" units.',
      'Enter the value \u2014 the converted result updates instantly.',
    ],
    features: [
      'Covers multiple measurement categories in one tool.',
      'Instant, accurate conversion using standard conversion factors.',
      'No need to memorize or look up conversion formulas.',
    ],
    examples: [
      { title: 'Length conversion', description: '5 kilometers converts to approximately 3.11 miles \u2014 handy when comparing distances given in different systems.' },
      { title: 'Temperature conversion', description: '100\u00b0F converts to approximately 37.8\u00b0C, using the standard Fahrenheit-to-Celsius formula rather than a linear ratio.' },
    ],
    useCases: [
      { title: 'Cooking and recipes', description: 'Convert between metric and imperial measurements when following a recipe from a different region.' },
      { title: 'Travel and logistics', description: 'Convert distances, weights, or temperatures when dealing with units from another country.' },
    ],
    tips: [
      'Temperature conversions aren\u2019t a simple multiplication like other units \u2014 double-check you\u2019re using the right formula if calculating manually elsewhere.',
    ],
    important:
      'Conversions use standard, internationally recognized conversion factors. For highly precise scientific or engineering work, confirm the exact factor required by your field\u2019s standards.',
    faq: [
      { question: 'What unit categories are supported?', answer: 'Common categories include length, weight/mass, temperature, and volume \u2014 select the category dropdown to see all available units.' },
    ],
  },

  // ───────────────────────── Converters ─────────────────────────
  'base64-encode': {
    intro:
      'Base64 Encode converts text (or binary data represented as text) into Base64 format \u2014 an ASCII-safe encoding that can pass safely through systems that only handle text, like embedding small images in CSS/HTML or including data in a URL or JSON payload.',
    howTo: [
      'Paste the text you want to encode.',
      'The Base64-encoded output appears instantly.',
      'Copy the result for use in your code, config, or data URL.',
    ],
    features: [
      'Instant client-side encoding \u2014 nothing sent to a server.',
      'Handles standard text and Unicode content correctly.',
    ],
    examples: [
      { title: 'Simple string', code: 'Hello, World! \u2192 SGVsbG8sIFdvcmxkIQ==', description: 'Base64 encoding turns arbitrary text into a longer ASCII-only string safe for contexts that can\u2019t handle raw special characters.' },
    ],
    useCases: [
      { title: 'Embedding small assets', description: 'Encode a small image or font as a data URI to embed directly in CSS or HTML, avoiding an extra network request.' },
      { title: 'API payloads', description: 'Encode binary-like data so it can be safely included inside a JSON field.' },
    ],
    tips: [
      'Base64 is encoding, not encryption \u2014 anyone can decode it instantly. Never use it to "hide" sensitive data like passwords.',
    ],
    important:
      'Base64-encoded data is roughly 33% larger than the original \u2014 it\u2019s useful for compatibility, not for reducing size.',
    faq: [
      { question: 'Is Base64 secure for hiding sensitive information?', answer: 'No \u2014 Base64 is a reversible encoding, not encryption. Anyone with the encoded string can decode it instantly.' },
    ],
  },

  // ───────────────────────── Web ─────────────────────────
  'color-picker': {
    intro:
      'Color Picker lets you select a color visually and get its value in HEX, RGB, and HSL formats simultaneously \u2014 the three formats most commonly needed across CSS, design tools, and image editing software.',
    howTo: [
      'Pick a color using the visual picker, or enter a known value directly.',
      'HEX, RGB, and HSL values update together automatically.',
      'Copy whichever format you need for your project.',
    ],
    features: [
      'Simultaneous HEX, RGB, and HSL output for any selected color.',
      'Visual picker for exploring colors, plus direct value entry for exact matching.',
    ],
    examples: [
      { title: 'Format equivalents', description: 'A color might read as #2D7367 in HEX, rgb(45, 115, 103) in RGB, and hsl(170, 44%, 31%) in HSL \u2014 the same color expressed three different ways for different tools.' },
    ],
    useCases: [
      { title: 'Web design', description: 'Pick a brand color and grab the exact CSS value needed for a stylesheet.' },
      { title: 'Design handoff', description: 'Share precise color values with a developer or designer working in a different tool.' },
    ],
    tips: [
      'HSL is often more intuitive for adjusting a color\u2019s lightness or saturation without changing its hue \u2014 useful when building a consistent color palette by hand.',
    ],
    important:
      'Colors can render slightly differently across monitors and color profiles; the values shown are accurate to the standard sRGB color space used across most web contexts.',
    faq: [
      { question: 'Which format should I use in CSS?', answer: 'All three work in modern CSS \u2014 HEX is the most compact and common, HSL is often easier to reason about when tweaking shades.' },
    ],
  },

  // ───────────────────────── Productivity ─────────────────────────
  'qr-code-generator': {
    intro:
      'QR Code Generator turns a URL, piece of text, or contact detail into a scannable QR code \u2014 the square barcode pattern any modern phone camera can read instantly. It\u2019s the fastest way to bridge a printed page or physical sign to a digital destination without anyone typing a URL by hand.',
    howTo: [
      'Enter the content you want encoded \u2014 a URL, plain text, or other supported data.',
      'The QR code generates and updates live as you type.',
      'Download the QR code as an image to print or share.',
    ],
    features: [
      'Generates a scannable QR code from any text or URL instantly.',
      'Live preview updates as you edit the content.',
      'Downloadable image, ready to print or embed.',
    ],
    examples: [
      { title: 'Linking to a website', description: 'Enter a full URL (including https://) to generate a QR code that opens the page directly when scanned \u2014 handy on flyers, business cards, or product packaging.' },
    ],
    useCases: [
      { title: 'Marketing materials', description: 'Add a scannable link to a poster, flyer, or product package that takes people straight to a website or menu.' },
      { title: 'Contact sharing', description: 'Generate a QR code for a contact detail or WhatsApp link so people can save it with one scan.' },
      { title: 'Event check-ins', description: 'Print a QR code linking to a registration or check-in form.' },
    ],
    tips: [
      'Test the QR code with an actual phone camera before printing anything at scale \u2014 make sure the destination URL is correct and loads properly.',
      'Keep the encoded content reasonably short; very long text produces a denser, harder-to-scan pattern.',
    ],
    important:
      'The generated QR codes are static \u2014 they encode the exact content you entered permanently. If you need to change the destination later without reprinting, encode a short link you control instead of the final URL directly.',
    faq: [
      { question: 'Does the QR code expire?', answer: 'No, static QR codes generated here work indefinitely as long as the encoded content (like a URL) remains valid.' },
      { question: 'Can I scan it to test before printing?', answer: 'Yes \u2014 use any modern phone\u2019s built-in camera app, which recognizes QR codes automatically without a separate scanner app.' },
    ],
  },

  'whatsapp-link-generator': {
    intro:
      'WhatsApp Link Generator creates a direct "click to chat" link that opens a WhatsApp conversation with a specific number, optionally pre-filled with a message \u2014 without the visitor needing to save the number as a contact first.',
    howTo: [
      'Enter the phone number, including country code, without spaces or symbols.',
      'Optionally add a pre-filled message that will appear ready to send.',
      'Copy the generated link to share on your website, bio, or social profile.',
    ],
    features: [
      'Generates a standards-compliant wa.me link.',
      'Optional pre-filled message support.',
      'Works whether the visitor has WhatsApp on desktop or mobile.',
    ],
    examples: [
      { title: 'Link with a pre-filled message', description: 'A link that opens a chat with your business number and automatically fills "Hi, I\u2019d like to ask about..." into the message box, ready for the visitor to send.' },
    ],
    useCases: [
      { title: 'Business inquiries', description: 'Add a "Chat on WhatsApp" button to a website or social bio that opens directly into a conversation.' },
      { title: 'Customer support', description: 'Share a direct link in email signatures or support pages for quick customer contact.' },
    ],
    tips: [
      'Always include the full international country code (e.g. 92 for Pakistan) without a leading zero or plus sign for the number to resolve correctly.',
    ],
    important:
      'The link only works if the recipient\u2019s number is active on WhatsApp; it doesn\u2019t verify the number for you, so double-check it before publishing the link widely.',
    faq: [
      { question: 'Does this work without saving the contact first?', answer: 'Yes \u2014 that\u2019s the main advantage of a wa.me link, it opens a chat directly without either party needing to save the other as a contact.' },
    ],
  },
};

export default TOOL_CONTENT;
