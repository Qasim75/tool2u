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
 * `executable: true` means the Run button works for that language:
 * SQL and Python run inside the browser (lib/runners), everything
 * else goes through the execution API (`/api/execute`) — see
 * `server/execution/languageMap.js` for the backend side. `executable: false` languages are still fully editable
 * and highlighted; they just don't have a Run target (HTML/CSS/JSON/
 * TypeScript don't have a single obvious "run and get stdout"
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
    executable: true, // runs via the secure execution API
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
    executable: true, // live preview in a sandboxed iframe (browser)
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
    executable: true, // live preview on a sample page (browser)
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
    executable: true, // validated + formatted in the browser
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
    executable: true, // runs in-browser on SQLite (WebAssembly) — see lib/runners/sqlEngine.js
    starter: `-- SQL playground (SQLite engine, runs in your browser)\n-- CREATE DATABASE / USE / SHOW TABLES / DESCRIBE all work.\n\nCREATE DATABASE IF NOT EXISTS school;\nUSE school;\n\nCREATE TABLE IF NOT EXISTS students (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  marks INTEGER\n);\n\n-- Clear old rows so the demo gives the same result every time you click Run.\nDELETE FROM students;\nINSERT INTO students (name, marks) VALUES\n  ('Ali', 82), ('Sara', 91), ('Ahmed', 67);\n\nSELECT * FROM students ORDER BY marks DESC;\n\nSHOW TABLES;\n`,
    loadExtension: async () => {
      const { sql } = await import('@codemirror/lang-sql');
      return sql();
    },
  },
  {
    id: 'python',
    label: 'Python',
    fileExtension: 'py',
    executable: true, // runs in-browser (Pyodide); falls back to the execution API
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
