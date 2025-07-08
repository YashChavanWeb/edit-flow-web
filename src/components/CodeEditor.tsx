
import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Save, Copy } from 'lucide-react';
import { FileItem } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface CodeEditorProps {
  file: FileItem;
  onContentChange: (content: string) => void;
  onRunCode: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  file,
  onContentChange,
  onRunCode,
}) => {
  const editorRef = useRef<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const getMonacoLanguage = (language: string) => {
    switch (language) {
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      case 'cpp':
        return 'cpp';
      default:
        return 'plaintext';
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure Monaco theme
    monaco.editor.defineTheme('vs-dark-custom', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2d2d30',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
      },
    });
    
    monaco.editor.setTheme('vs-dark-custom');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      onRunCode();
      toast({
        title: "Code Executed",
        description: "Your code has been executed successfully!",
      });
    } catch (error) {
      toast({
        title: "Execution Error",
        description: "There was an error running your code.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(file.content);
    toast({
      title: "Code Copied",
      description: "Code has been copied to clipboard.",
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Tab Bar */}
      <div className="h-8 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center">
        <div className="flex items-center px-3 h-full bg-[#1e1e1e] border-r border-[#3e3e42] min-w-0">
          <span className="text-sm text-white truncate">{file.name}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-10 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            Language: {file.language.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyCode}
            className="text-gray-400 hover:text-white h-6 px-2"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toast({
                title: "File Saved",
                description: `${file.name} has been saved.`,
              });
            }}
            className="text-gray-400 hover:text-white h-6 px-2"
          >
            <Save className="w-3 h-3 mr-1" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning}
            className="text-green-400 hover:text-green-300 h-6 px-2"
          >
            <Play className="w-3 h-3 mr-1" />
            {isRunning ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getMonacoLanguage(file.language)}
          value={file.content}
          onChange={(value) => onContentChange(value || '')}
          onMount={handleEditorDidMount}
          options={{
            theme: 'vs-dark-custom',
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: true },
            wordWrap: 'on',
            tabSize: 4,
            insertSpaces: true,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            guides: {
              indentation: true,
              bracketPairs: true,
            },
          }}
        />
      </div>
    </div>
  );
};
