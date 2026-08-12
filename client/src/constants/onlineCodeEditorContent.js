/**
 * Long-form explanatory content for the Online Code Editor tool page
 * (What is it / How to use / Common use cases). Kept separate from
 * the component so the copy is easy to review and update without
 * touching editor logic. FAQ content lives in `constants/faq.js`
 * (`TOOL_FAQS['online-code-editor']`) since that's also read for the
 * page's JSON-LD structured data — this file doesn't duplicate it.
 */

export const ONLINE_CODE_EDITOR_INTRO = {
  eyebrow: 'What is it?',
  title: 'What is the Tool2U Online Code Editor?',
  paragraphs: [
    'The Online Code Editor is a free, browser-based code editor with real syntax highlighting for 17 programming languages — JavaScript, TypeScript, Python, Java, C, C++, C#, PHP, Go, Rust, Ruby, Kotlin, Dart, HTML, CSS, SQL, and JSON.',
    'For JavaScript, Python, C, C++, Java, C#, Go, Rust, PHP, Ruby, Kotlin, and Dart, you can also click Run: your code executes in an isolated, sandboxed environment, completely separate from your browser and from the application server — you get back program output, compile errors, runtime errors, and execution time.',
    "It's built for quickly writing, testing, or sharing a snippet without opening a full IDE: paste in code, switch languages, and the editor highlights syntax, matches brackets, and keeps indentation for you.",
  ],
};

export const ONLINE_CODE_EDITOR_HOW_TO = {
  eyebrow: 'How to use it',
  title: 'How to use the Online Code Editor',
  steps: [
    {
      title: 'Pick a language',
      description: 'Choose from the language dropdown — the editor loads the matching syntax highlighting instantly.',
    },
    {
      title: 'Write or paste your code',
      description: 'Type directly in the editor, or paste in an existing snippet. Brackets, quotes, and indentation are handled automatically.',
    },
    {
      title: 'Add input, if your program needs it',
      description: 'Use the Program Input panel for any values your code would normally read from standard input.',
    },
    {
      title: 'Click Run',
      description: 'For runnable languages, Run sends your code to an isolated sandbox and shows output, errors, and execution time. Use Stop to cancel waiting on a result.',
    },
    {
      title: 'Copy or download your work',
      description: 'Use Copy to grab the code for pasting elsewhere, or Download to save it as a properly named file (e.g. main.py, App.java).',
    },
    {
      title: 'Reset or clear when you\u2019re done',
      description: 'Clear empties the editor completely; Reset restores a starter snippet for the selected language.',
    },
  ],
};

export const ONLINE_CODE_EDITOR_USE_CASES = {
  eyebrow: 'Common use cases',
  title: 'What people use it for',
  items: [
    {
      title: 'Quick syntax checks',
      description: 'Paste a snippet to get clean, readable highlighting before pasting it into a README, ticket, or chat message.',
    },
    {
      title: 'Learning a new language',
      description: 'Try out unfamiliar syntax in Python, Rust, Go, or Dart with proper highlighting, without installing a toolchain.',
    },
    {
      title: 'Drafting code away from your IDE',
      description: 'Sketch out a function or config file on a phone or a locked-down machine, then download or copy it into your project.',
    },
    {
      title: 'Sharing formatted snippets',
      description: 'Write code with correct indentation and highlighting, then copy it into documentation, blog posts, or code reviews.',
    },
  ],
};
