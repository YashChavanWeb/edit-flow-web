
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { CodeEditor } from '@/components/CodeEditor';
import { FileExplorer } from '@/components/FileExplorer';
import { PanelLayout } from '@/components/PanelLayout';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { AuthModal } from '@/components/AuthModal';
import { CodeOutput } from '@/components/CodeOutput';
import { v4 as uuidv4 } from 'uuid';

export interface FileItem {
  id: string;
  name: string;
  content: string;
  language: 'python' | 'java' | 'cpp';
  type: 'file' | 'folder';
  parentId?: string;
  children?: FileItem[];
  createdAt: Date;
}

const Index = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);
  const [codeInput, setCodeInput] = useState('');

  // Initialize with sample files
  useEffect(() => {
    const sampleFiles: FileItem[] = [
      {
        id: uuidv4(),
        name: 'main.py',
        content: '# Welcome to the Online Code Editor\n\ndef hello_world():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    hello_world()',
        language: 'python',
        type: 'file',
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'HelloWorld.java',
        content: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        language: 'java',
        type: 'file',
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'main.cpp',
        content: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
        language: 'cpp',
        type: 'file',
        createdAt: new Date(),
      },
    ];
    setFiles(sampleFiles);
    setActiveFileId(sampleFiles[0].id);
  }, []);

  // Auto-save functionality - reduced frequency
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeFileId) {
        toast({
          title: "Auto-saved",
          description: "Your changes have been saved automatically.",
          duration: 1500,
        });
      }
    }, 30000); // Changed from 3s to 30s

    return () => clearInterval(interval);
  }, [activeFileId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 's':
            event.preventDefault();
            handleSaveFile();
            break;
          case 'd':
            event.preventDefault();
            handleDuplicateFile();
            break;
          case 'Enter':
            event.preventDefault();
            handleRunCode();
            break;
        }
      }
      
      if (event.altKey && event.key === 's') {
        event.preventDefault();
        setShowShortcuts(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFileId]);

  const handleSaveFile = useCallback(() => {
    if (activeFileId) {
      toast({
        title: "File Saved",
        description: "Your changes have been saved successfully.",
      });
    }
  }, [activeFileId]);

  const handleDuplicateFile = useCallback(() => {
    if (activeFileId) {
      const activeFile = files.find(f => f.id === activeFileId);
      if (activeFile) {
        const duplicatedFile: FileItem = {
          ...activeFile,
          id: uuidv4(),
          name: `${activeFile.name.split('.')[0]}_copy.${activeFile.name.split('.')[1]}`,
          createdAt: new Date(),
        };
        setFiles(prev => [...prev, duplicatedFile]);
        toast({
          title: "File Duplicated",
          description: `Created copy: ${duplicatedFile.name}`,
        });
      }
    }
  }, [activeFileId, files]);

  const handleRunCode = useCallback(() => {
    toast({
      title: "Running Code",
      description: "Executing your code...",
    });
  }, []);

  const createNewFile = (name: string, language: 'python' | 'java' | 'cpp') => {
    const newFile: FileItem = {
      id: uuidv4(),
      name,
      content: getDefaultContent(language),
      language,
      type: 'file',
      createdAt: new Date(),
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
    toast({
      title: "New File Created",
      description: `Created ${name}`,
    });
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFileId === fileId) {
      const remainingFiles = files.filter(f => f.id !== fileId);
      setActiveFileId(remainingFiles.length > 0 ? remainingFiles[0].id : null);
    }
    toast({
      title: "File Deleted",
      description: "File has been removed from your workspace.",
    });
  };

  const updateFileContent = (fileId: string, content: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, content } : f
    ));
  };

  const renameFile = (fileId: string, newName: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, name: newName } : f
    ));
    toast({
      title: "File Renamed",
      description: `File renamed to ${newName}`,
    });
  };

  const getDefaultContent = (language: 'python' | 'java' | 'cpp'): string => {
    switch (language) {
      case 'python':
        return '# New Python file\n\ndef main():\n    pass\n\nif __name__ == "__main__":\n    main()';
      case 'java':
        return 'public class NewClass {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}';
      case 'cpp':
        return '#include <iostream>\n\nint main() {\n    // Your code here\n    return 0;\n}';
      default:
        return '';
    }
  };

  const activeFile = files.find(f => f.id === activeFileId);

  if (showAuthModal) {
    return <AuthModal onAuthSuccess={() => {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    }} />;
  }

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col">
      {/* Header */}
      <header className="h-12 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-sm font-medium">VS Code Online</h1>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Run</span>
            <span>Help</span>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button
            onClick={() => setShowShortcuts(true)}
            className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded"
          >
            Shortcuts (Alt+S)
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        <PanelLayout
          fileExplorer={
            <FileExplorer
              files={files}
              activeFileId={activeFileId}
              onFileSelect={setActiveFileId}
              onCreateFile={createNewFile}
              onDeleteFile={deleteFile}
              onRenameFile={renameFile}
            />
          }
          codeEditor={
            activeFile ? (
              <CodeEditor
                file={activeFile}
                onContentChange={(content) => updateFileContent(activeFile.id, content)}
                onRunCode={handleRunCode}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select a file to start coding
              </div>
            )
          }
          codeOutput={
            <CodeOutput
              code={activeFile?.content || ''}
              language={activeFile?.language || 'python'}
              input={codeInput}
              onInputChange={setCodeInput}
            />
          }
        />
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  );
};

export default Index;
