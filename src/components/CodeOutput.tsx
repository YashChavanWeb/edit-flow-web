import React, { useState } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeOutputProps {
  code: string;
  language: string;
  input: string;
  onInputChange: (input: string) => void;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({
  code,
  language,
  input,
  onInputChange,
}) => {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');

  const executeCode = async () => {
    setIsRunning(true);
    setExecutionStatus('running');
    setOutput('Running code...\n');

    try {
      // Simulate code execution with proper output based on language
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let result = '';
      if (language === 'python') {
        result = simulatePythonExecution(code, input);
      } else if (language === 'java') {
        result = simulateJavaExecution(code, input);
      } else if (language === 'cpp') {
        result = simulateCppExecution(code, input);
      }

      setOutput(result);
      setExecutionStatus('completed');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      setExecutionStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const simulatePythonExecution = (code: string, input: string): string => {
    if (code.includes('print("Hello, World!")')) {
      return 'Hello, World!\n';
    }
    if (code.includes('hello_world')) {
      return 'Hello, World!\n';
    }
    if (input.trim()) {
      return `Input received: ${input}\nProcessed successfully.\n`;
    }
    return 'Code executed successfully.\nNo output generated.\n';
  };

  const simulateJavaExecution = (code: string, input: string): string => {
    if (code.includes('System.out.println("Hello, World!")')) {
      return 'Hello, World!\n';
    }
    if (input.trim()) {
      return `Input received: ${input}\nProcessed successfully.\n`;
    }
    return 'Code executed successfully.\nNo output generated.\n';
  };

  const simulateCppExecution = (code: string, input: string): string => {
    if (code.includes('std::cout << "Hello, World!"')) {
      return 'Hello, World!\n';
    }
    if (input.trim()) {
      return `Input received: ${input}\nProcessed successfully.\n`;
    }
    return 'Code executed successfully.\nNo output generated.\n';
  };

  const clearOutput = () => {
    setOutput('');
    setExecutionStatus('idle');
  };

  const stopExecution = () => {
    setIsRunning(false);
    setExecutionStatus('completed');
    setOutput(prev => prev + '\nExecution stopped by user.\n');
  };

  return (
    <div className="h-full bg-[#252526] border-l border-[#3e3e42]">
      <div className="h-full flex flex-col">
        <div className="h-8 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-3">
          <span className="text-xs text-gray-300">Input/Output</span>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={executeCode}
              disabled={isRunning}
              className="h-5 w-5 p-0 text-green-400 hover:text-green-300"
            >
              <Play className="w-3 h-3" />
            </Button>
            {isRunning && (
              <Button
                variant="ghost"
                size="sm"
                onClick={stopExecution}
                className="h-5 w-5 p-0 text-red-400 hover:text-red-300"
              >
                <Square className="w-3 h-3" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearOutput}
              className="h-5 w-5 p-0 text-gray-400 hover:text-white"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 border-b border-[#3e3e42]">
            <div className="h-6 bg-[#2d2d30] flex items-center px-2">
              <span className="text-xs text-gray-400">Input</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              className="w-full h-full bg-[#1e1e1e] text-white p-2 text-sm resize-none border-none outline-none"
              placeholder="Enter input for your program..."
            />
          </div>
          <div className="flex-1">
            <div className="h-6 bg-[#2d2d30] flex items-center justify-between px-2">
              <span className="text-xs text-gray-400">Output</span>
              <div className={`text-xs px-2 py-0.5 rounded ${
                executionStatus === 'running' ? 'bg-yellow-600 text-yellow-100' :
                executionStatus === 'completed' ? 'bg-green-600 text-green-100' :
                executionStatus === 'error' ? 'bg-red-600 text-red-100' :
                'bg-gray-600 text-gray-100'
              }`}>
                {executionStatus === 'running' ? 'Running' :
                 executionStatus === 'completed' ? 'Completed' :
                 executionStatus === 'error' ? 'Error' : 'Ready'}
              </div>
            </div>
            <div className="w-full h-full bg-[#1e1e1e] text-white p-2 text-sm overflow-auto font-mono">
              {output || (
                <div className="text-gray-400">
                  Output will appear here...
                  <br />
                  <span className="text-xs">Click the play button above to run your code</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};