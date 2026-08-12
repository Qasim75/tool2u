/**
 * codeEditorLanguages
 * ----------------------------------------------------------------
 * Single source of truth for every language the Online Code Editor
 * supports. To add a new language later: add one entry here with an
 * id, label, file extension, a starter snippet, an `executable` flag,
 * and a `loadExtension` function that dynamically imports the
 * matching CodeMirror language package. Nothing else needs to
 * change — the language selector, editor, download button, and Run
 * button all read from this list.
 *
 * `executable: true` means the execution API (`/api/execute`, Phase
 * 3) has been wired up and tested for that language — see
 * `server/execution/languageMap.js` for the backend side of this
 * mapping. `executable: false` languages are still fully editable
 * and highlighted; they just don't have a Run target (HTML/CSS/JSON/
 * SQL/TypeScript don't have a single obvious "run and get stdout"
 * semantic the way a program does).
 *
 * `loadExtension` is dynamic (`import()`) so a language's parser
 * package is only downloaded when someone actually selects it,
 * keeping the initial editor bundle small even as more languages
 * are added.
 */

/**
 * @typedef {Object} CodeEditorLanguage
 * @property {string} id             stable id, used as the <select> value AND the `language` sent to /api/execute
 * @property {string} label          shown in the language selector
 * @property {string} fileExtension  used for the downloaded file name
 * @property {boolean} executable    whether the Run button is enabled for this language
 * @property {string} starter        starter snippet shown in a blank editor
 * @property {() => Promise<import('@codemirror/state').Extension>} loadExtension
 */

/** @type {CodeEditorLanguage[]} */
export const CODE_EDITOR_LANGUAGES = [
  {
    id: 'javascript',
    label: 'JavaScript',
    fileExtension: 'js',
    executable: true, // runs via the secure execution API
    starter: `// JavaScript\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('Tool2U'));\n`,
    loadExtension: async () => {
      const { javascript } = await import('@codemirror/lang-javascript');
      return javascript();
    },
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    fileExtension: 'ts',
    executable: false, // editor-only — no execution provider for this yet
    starter: `// TypeScript\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('Tool2U'));\n`,
    loadExtension: async () => {
      const { javascript } = await import('@codemirror/lang-javascript');
      return javascript({ typescript: true });
    },
  },
  {
    id: 'html',
    label: 'HTML',
    fileExtension: 'html',
    executable: false, // editor-only — no execution provider for this yet
    starter: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Tool2U</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>\n`,
    loadExtension: async () => {
      const { html } = await import('@codemirror/lang-html');
      return html();
    },
  },
  {
    id: 'css',
    label: 'CSS',
    fileExtension: 'css',
    executable: false, // editor-only — no execution provider for this yet
    starter: `body {\n  font-family: sans-serif;\n  color: #1b1f23;\n}\n`,
    loadExtension: async () => {
      const { css } = await import('@codemirror/lang-css');
      return css();
    },
  },
  {
    id: 'json',
    label: 'JSON',
    fileExtension: 'json',
    executable: false, // editor-only — no execution provider for this yet
    starter: `{\n  "name": "Tool2U",\n  "type": "developer tool"\n}\n`,
    loadExtension: async () => {
      const { json } = await import('@codemirror/lang-json');
      return json();
    },
  },
  {
    id: 'sql',
    label: 'SQL',
    fileExtension: 'sql',
    executable: false, // editor-only — no execution provider for this yet
    starter: `SELECT id, name\nFROM users\nWHERE active = 1\nORDER BY name;\n`,
    loadExtension: async () => {
      const { sql } = await import('@codemirror/lang-sql');
      return sql();
    },
  },
  {
    id: 'python',
    label: 'Python',
    fileExtension: 'py',
    executable: true, // runs via the secure execution API
    starter: `# Python\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Tool2U"))\n`,
    loadExtension: async () => {
      const { python } = await import('@codemirror/lang-python');
      return python();
    },
  },
  {
    id: 'java',
    label: 'Java',
    fileExtension: 'java',
    executable: true, // runs via the secure execution API
    starter: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Tool2U!");\n    }\n}\n`,
    loadExtension: async () => {
      const { java } = await import('@codemirror/lang-java');
      return java();
    },
  },
  {
    id: 'c',
    label: 'C',
    fileExtension: 'c',
    executable: true, // runs via the secure execution API
    starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, Tool2U!\\n");\n    return 0;\n}\n`,
    loadExtension: async () => {
      const { cpp } = await import('@codemirror/lang-cpp');
      return cpp();
    },
  },
  {
    id: 'cpp',
    label: 'C++',
    fileExtension: 'cpp',
    executable: true, // runs via the secure execution API
    starter: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, Tool2U!" << std::endl;\n    return 0;\n}\n`,
    loadExtension: async () => {
      const { cpp } = await import('@codemirror/lang-cpp');
      return cpp();
    },
  },
  {
    id: 'csharp',
    label: 'C#',
    fileExtension: 'cs',
    executable: true, // runs via the secure execution API
    starter: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, Tool2U!");\n    }\n}\n`,
    loadExtension: async () => {
      const { StreamLanguage } = await import('@codemirror/language');
      const { csharp } = await import('@codemirror/legacy-modes/mode/clike');
      return StreamLanguage.define(csharp);
    },
  },
  {
    id: 'php',
    label: 'PHP',
    fileExtension: 'php',
    executable: true, // runs via the secure execution API
    starter: `<?php\n\nfunction greet($name) {\n    return "Hello, $name!";\n}\n\necho greet("Tool2U");\n`,
    loadExtension: async () => {
      const { php } = await import('@codemirror/lang-php');
      return php();
    },
  },
  {
    id: 'go',
    label: 'Go',
    fileExtension: 'go',
    executable: true, // runs via the secure execution API
    starter: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Tool2U!")\n}\n`,
    loadExtension: async () => {
      const { go } = await import('@codemirror/lang-go');
      return go();
    },
  },
  {
    id: 'rust',
    label: 'Rust',
    fileExtension: 'rs',
    executable: true, // runs via the secure execution API
    starter: `fn main() {\n    println!("Hello, Tool2U!");\n}\n`,
    loadExtension: async () => {
      const { rust } = await import('@codemirror/lang-rust');
      return rust();
    },
  },
  {
    id: 'dart',
    label: 'Dart',
    fileExtension: 'dart',
    executable: true, // runs via the secure execution API
    starter: `void main() {\n  print('Hello, Tool2U!');\n}\n`,
    loadExtension: async () => {
      const { StreamLanguage } = await import('@codemirror/language');
      const { dart } = await import('@codemirror/legacy-modes/mode/clike');
      return StreamLanguage.define(dart);
    },
  },
  {
    id: 'ruby',
    label: 'Ruby',
    fileExtension: 'rb',
    executable: true, // runs via the secure execution API
    starter: `def greet(name)\n  "Hello, #{name}!"\nend\n\nputs greet("Tool2U")\n`,
    loadExtension: async () => {
      const { StreamLanguage } = await import('@codemirror/language');
      const { ruby } = await import('@codemirror/legacy-modes/mode/ruby');
      return StreamLanguage.define(ruby);
    },
  },
  {
    id: 'kotlin',
    label: 'Kotlin',
    fileExtension: 'kt',
    executable: true, // runs via the secure execution API
    starter: `fun main() {\n    println("Hello, Tool2U!")\n}\n`,
    loadExtension: async () => {
      const { StreamLanguage } = await import('@codemirror/language');
      const { kotlin } = await import('@codemirror/legacy-modes/mode/clike');
      return StreamLanguage.define(kotlin);
    },
  },
];

export function getLanguageById(id) {
  return CODE_EDITOR_LANGUAGES.find((lang) => lang.id === id) || CODE_EDITOR_LANGUAGES[0];
}

export function isLanguageExecutable(id) {
  return Boolean(getLanguageById(id)?.executable);
}

/** Options shaped for the shared `LanguageSelector` component ({ value, label }). */
export const CODE_EDITOR_LANGUAGE_OPTIONS = CODE_EDITOR_LANGUAGES.map(({ id, label }) => ({
  value: id,
  label,
}));

/** Just the languages the Run button currently supports. */
export const EXECUTABLE_LANGUAGES = CODE_EDITOR_LANGUAGES.filter((lang) => lang.executable);
