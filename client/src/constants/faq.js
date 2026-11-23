export const FAQS = [
  {
    question: 'Do I need to sign up to use Tool2U?',
    answer:
      'No. Every tool runs directly in your browser — there is no account, no login, and no email required.',
  },
  {
    question: 'Is my data uploaded to a server?',
    answer:
      'No. All calculations happen locally on your device using JavaScript. Your text, files, and numbers never leave your browser.',
  },
  {
    question: 'Are the tools free to use?',
    answer: 'Yes, every tool on Tool2U is completely free with no usage limits.',
  },
  {
    question: 'Can I use Tool2U on my phone?',
    answer:
      'Yes. The site is built mobile-first and every tool is fully responsive and works well on small screens.',
  },
  {
    question: 'Will more tools be added?',
    answer:
      'Yes — Tool2U is actively growing. If there is a specific tool you would like to see, reach out via the Contact page.',
  },
];

export const TOOL_FAQS = {
  'online-code-editor': [
    {
      question: 'Does the Online Code Editor run or execute my code?',
      answer:
        "Yes, for JavaScript, Python, SQL, C, C++, Java, C#, Go, Rust, PHP, Ruby, Kotlin, and Dart. Click Run and your code executes in an isolated environment, never on the main application server. SQL runs on a real SQLite engine inside your browser (CREATE DATABASE, USE, SHOW TABLES and DESCRIBE are supported), and Python also runs privately in your browser. HTML, CSS, JSON and TypeScript are for writing and highlighting only.",
    },
    {
      question: 'Which programming languages are supported?',
      answer:
        'The editor supports syntax highlighting for JavaScript, TypeScript, HTML, CSS, JSON, SQL, Python, Java, C, C++, C#, PHP, Go, Rust, Dart, Ruby, and Kotlin. Of these, JavaScript, Python, SQL, C, C++, Java, C#, Go, Rust, PHP, Ruby, Kotlin, and Dart can also be executed.',
    },
    {
      question: 'Is my code saved or sent to a server?',
      answer:
        "Your code isn't saved on our servers. SQL and Python run entirely inside your browser, so nothing is sent anywhere (your SQL databases are kept in this browser's local storage so they survive a refresh). For the other languages, the code is sent once to our execution API to run in a sandbox — it isn't logged, stored, or shared. Closing or refreshing the page clears the editor.",
    },
    {
      question: 'Is it safe to run code here? What stops malicious code?',
      answer:
        'Every run happens inside an isolated sandbox with strict CPU, memory, and time limits, completely separate from the application that serves this website. Code you submit can\u2019t access our server\u2019s filesystem, other users\u2019 sessions, or the internet beyond what the sandbox itself allows.',
    },
    {
      question: 'Can I download the code I write?',
      answer:
        'Yes. Use the Download button to save your code as a file with the correct extension for the selected language (e.g. .py, .js, .java).',
    },
    {
      question: 'Does the editor work on mobile?',
      answer:
        'Yes. The editor, language selector, and all actions are fully responsive and usable on phones and tablets, though a larger screen is more comfortable for longer programs.',
    },
  ],
  'cgpa-calculator': [
    {
      question: 'How is CGPA calculated?',
      answer: 'CGPA is calculated by dividing the sum of all quality points earned by the total number of credit hours attempted across all semesters.',
    },
    {
      question: 'Can I use different grading scales?',
      answer: 'Yes, you can customize the grading scale to match your university\'s system, whether it\'s a 4.0, 5.0, or 10.0 scale.',
    }
  ],
  'qr-code-generator': [
    {
      question: 'Is the generated QR code permanent?',
      answer: 'Yes, the QR codes generated are static, meaning they will work forever as long as the content (URL, text, etc.) remains valid.',
    },
    {
      question: 'Can I customize the color of the QR code?',
      answer: 'Currently, we support standard black and white QR codes for maximum scannability, but color customization is planned for a future update.',
    }
  ],
  'password-generator': [
    {
      question: 'Are the generated passwords secure?',
      answer: 'Yes, we use cryptographically secure random number generation to ensure your passwords are truly random and hard to crack.',
    }
  ]
};
