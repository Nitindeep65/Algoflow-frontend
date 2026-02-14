import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function CodePanel({ initialCode = '// Start coding here\nfunction solution() {\n  // Write your solution here\n}', onChange, onMount, onLanguageChange }) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState('javascript');

  const languages = [
    { value: 'javascript', label: 'JavaScript', template: '// Start coding here\nfunction solution() {\n  // Write your solution here\n}' },
    { value: 'typescript', label: 'TypeScript', template: '// Start coding here\nfunction solution(): any {\n  // Write your solution here\n}' },
    { value: 'python', label: 'Python', template: '# Start coding here\ndef solution():\n    # Write your solution here\n    pass' },
    { value: 'java', label: 'Java', template: '// Start coding here\npublic class Solution {\n    public void solution() {\n        // Write your solution here\n    }\n}' },
    { value: 'cpp', label: 'C++', template: '// Start coding here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}' },
    { value: 'csharp', label: 'C#', template: '// Start coding here\nusing System;\n\npublic class Solution {\n    public void Main() {\n        // Write your solution here\n    }\n}' },
    { value: 'go', label: 'Go', template: '// Start coding here\npackage main\n\nimport "fmt"\n\nfunc main() {\n    // Write your solution here\n}' },
    { value: 'rust', label: 'Rust', template: '// Start coding here\nfn main() {\n    // Write your solution here\n}' }
  ];

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    const selectedLang = languages.find(lang => lang.value === newLanguage);
    if (selectedLang) {
      setCode(selectedLang.template);
      if (onChange) {
        onChange(selectedLang.template);
      }
      if (onLanguageChange) {
        onLanguageChange(newLanguage);
      }
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
      typeRoots: ["node_modules/@types"]
    });

    if (onMount) {
      onMount(editor, monaco);
    }
  };

  const handleCodeChange = (value) => {
    setCode(value || '');
    if (onChange) {
      onChange(value || '');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Language Selector */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 dark:bg-gray-950 border-b border-gray-700 dark:border-gray-800">
        <label className="text-xs font-medium text-gray-400 dark:text-gray-500">Language:</label>
        <select 
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="px-2 py-1 bg-gray-700 dark:bg-gray-900 text-white dark:text-gray-100 text-xs font-medium border border-gray-600 dark:border-gray-800 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-700 focus:border-gray-500 dark:focus:border-gray-700"
        >
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            acceptSuggestionOnCommitCharacter: true,
            quickSuggestions: true,
            contextmenu: true,
            autoIndent: "advanced"
          }}
        />
      </div>
    </div>
  );
}

export { CodePanel };
