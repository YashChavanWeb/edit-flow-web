
import React, { useState } from 'react';
import { File, Folder, Plus, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { FileItem } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FileExplorerProps {
  files: FileItem[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onCreateFile: (name: string, language: 'python' | 'java' | 'cpp') => void;
  onDeleteFile: (fileId: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFileId,
  onFileSelect,
  onCreateFile,
  onDeleteFile,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return <File className="w-4 h-4 text-blue-400" />;
  };

  const getLanguageFromExtension = (fileName: string): 'python' | 'java' | 'cpp' => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'cpp':
      case 'cc':
      case 'cxx':
        return 'cpp';
      default:
        return 'python';
    }
  };

  const handleCreateFile = (language: 'python' | 'java' | 'cpp') => {
    const extensions = { python: 'py', java: 'java', cpp: 'cpp' };
    const fileName = `untitled.${extensions[language]}`;
    onCreateFile(fileName, language);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Explorer Header */}
      <div className="h-8 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-3">
        <span className="text-xs text-gray-300 font-medium">EXPLORER</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-white">
              <Plus className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#2d2d30] border-[#3e3e42]">
            <DropdownMenuItem 
              onClick={() => handleCreateFile('python')}
              className="text-white hover:bg-[#3e3e42]"
            >
              New Python File
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleCreateFile('java')}
              className="text-white hover:bg-[#3e3e42]"
            >
              New Java File
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleCreateFile('cpp')}
              className="text-white hover:bg-[#3e3e42]"
            >
              New C++ File
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto">
        <div className="p-2">
          <div className="text-xs text-gray-400 mb-2 flex items-center">
            <ChevronDown className="w-3 h-3 mr-1" />
            WORKSPACE
          </div>
          <div className="space-y-1">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center justify-between group px-2 py-1 rounded cursor-pointer transition-colors ${
                  activeFileId === file.id
                    ? 'bg-[#37373d] text-white'
                    : 'text-gray-300 hover:bg-[#2a2d2e]'
                }`}
                onClick={() => onFileSelect(file.id)}
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  {getFileIcon(file.name)}
                  <span className="text-sm truncate">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFile(file.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
