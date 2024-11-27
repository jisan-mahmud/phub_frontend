import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import { FiLock, FiGlobe, FiLink } from 'react-icons/fi';

const languageOptions = [
  { value: 'javascript', label: 'JavaScript', extension: 'js' },
  { value: 'typescript', label: 'TypeScript', extension: 'ts' },
  { value: 'python', label: 'Python', extension: 'py' },
  { value: 'java', label: 'Java', extension: 'java' },
  { value: 'cpp', label: 'C++', extension: 'cpp' },
  { value: 'csharp', label: 'C#', extension: 'cs' },
  { value: 'php', label: 'PHP', extension: 'php' },
  { value: 'ruby', label: 'Ruby', extension: 'rb' },
  { value: 'go', label: 'Go', extension: 'go' },
  { value: 'rust', label: 'Rust', extension: 'rs' },
  { value: 'swift', label: 'Swift', extension: 'swift' },
  { value: 'kotlin', label: 'Kotlin', extension: 'kt' },
  { value: 'sql', label: 'SQL', extension: 'sql' },
  { value: 'html', label: 'HTML', extension: 'html' },
  { value: 'css', label: 'CSS', extension: 'css' },
  { value: 'json', label: 'JSON', extension: 'json' },
  { value: 'yaml', label: 'YAML', extension: 'yaml' },
  { value: 'markdown', label: 'Markdown', extension: 'md' },
  { value: 'shell', label: 'Shell Script', extension: 'sh' },
  { value: 'xml', label: 'XML', extension: 'xml' }
];

const visibilityOptions = [
  { value: 'public', label: 'Public', icon: FiGlobe },
  { value: 'private', label: 'Private', icon: FiLock },
  { value: 'unlisted', label: 'Unlisted', icon: FiLink },
];

const tagOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'api', label: 'API' },
  { value: 'security', label: 'Security' },
  { value: 'algorithms', label: 'Algorithms' },
  { value: 'devops', label: 'DevOps' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'web', label: 'Web' },
  { value: 'testing', label: 'Testing' },
  { value: 'performance', label: 'Performance' },
  { value: 'ui', label: 'UI' },
  { value: 'ux', label: 'UX' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'architecture', label: 'Architecture' }
];

const getLanguageTemplate = (language) => {
  const templates = {
    javascript: `// Example JavaScript code
function example() {
  // Your code here
}`,
    typescript: `// Example TypeScript code
interface Example {
  property: string;
}

function example(): void {
  // Your code here
}`,
    python: `# Example Python code
def example():
    # Your code here
    pass`,
    java: `// Example Java code
public class Example {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    cpp: `// Example C++ code
#include <iostream>

int main() {
    // Your code here
    return 0;
}`,
    csharp: `// Example C# code
using System;

class Program {
    static void Main() {
        // Your code here
    }
}`,
    php: `<?php
// Example PHP code
function example() {
    // Your code here
}`,
    ruby: `# Example Ruby code
def example
  # Your code here
end`,
    go: `// Example Go code
package main

func main() {
    // Your code here
}`,
    rust: `// Example Rust code
fn main() {
    // Your code here
}`,
    swift: `// Example Swift code
func example() {
    // Your code here
}`,
    kotlin: `// Example Kotlin code
fun main() {
    // Your code here
}`,
    sql: `-- Example SQL query
SELECT column_name
FROM table_name
WHERE condition;`,
    html: `<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <!-- Your code here -->
</body>
</html>`,
    css: `/* Example CSS styles */
.example {
    /* Your styles here */
}`,
    json: `{
  "example": {
    "property": "value"
  }
}`,
    yaml: `# Example YAML
example:
  property: value`,
    markdown: `# Example Markdown

## Section

Your content here`,
    shell: `#!/bin/bash
# Example shell script
echo "Hello, World!"`,
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<root>
    <!-- Your code here -->
</root>`
  };

  return templates[language] || '// Start coding here';
};

function NewSnippet() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: getLanguageTemplate('javascript'),
    language: languageOptions[0],
    visibility: visibilityOptions[0],
    tags: [],
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      code: getLanguageTemplate(prev.language.value)
    }));
  }, [formData.language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.tags.length > 5) {
      toast.error('Maximum 5 tags allowed');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Snippet posted successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      toast.error('Failed to post snippet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: 'transparent',
      border: '1px solid rgb(209, 213, 219)',
      '&:hover': {
        borderColor: 'rgb(79, 70, 229)'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? 'rgb(79, 70, 229)' : state.isFocused ? 'rgb(243, 244, 246)' : 'transparent',
      ':active': {
        backgroundColor: 'rgb(79, 70, 229)'
      }
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'rgb(224, 231, 255)',
      '.dark &': {
        backgroundColor: 'rgb(67, 56, 202)'
      }
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'rgb(67, 56, 202)',
      '.dark &': {
        color: 'rgb(224, 231, 255)'
      }
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'rgb(67, 56, 202)',
      ':hover': {
        backgroundColor: 'rgb(199, 210, 254)',
        color: 'rgb(49, 46, 129)'
      },
      '.dark &': {
        color: 'rgb(224, 231, 255)',
        ':hover': {
          backgroundColor: 'rgb(49, 46, 129)',
          color: 'rgb(199, 210, 254)'
        }
      }
    })
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Toaster position="top-center" />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Create New Snippet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Give your snippet a title"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add some context about your snippet"
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <Select
                value={formData.language}
                onChange={(option) => setFormData({ ...formData, language: option })}
                options={languageOptions}
                styles={customStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Visibility
              </label>
              <Select
                value={formData.visibility}
                onChange={(option) => setFormData({ ...formData, visibility: option })}
                options={visibilityOptions}
                styles={customStyles}
                formatOptionLabel={({ label, icon: Icon }) => (
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (max 5)
            </label>
            <Select
              isMulti
              value={formData.tags}
              onChange={(options) => setFormData({ ...formData, tags: options })}
              options={tagOptions}
              styles={customStyles}
              placeholder="Add up to 5 tags"
              className="react-select-container"
              classNamePrefix="react-select"
              isOptionDisabled={() => formData.tags.length >= 5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Code
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <Editor
                height="400px"
                language={formData.language.value}
                value={formData.code}
                onChange={(value) => setFormData({ ...formData, code: value || '' })}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                  formatOnPaste: true,
                  formatOnType: true,
                }}
                loading={<div className="text-center p-4">Loading editor...</div>}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
                       hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white
                       bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
                       focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50
                       disabled:cursor-not-allowed flex items-center ${
                         isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
                       }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </>
              ) : (
                'Post Snippet'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewSnippet;