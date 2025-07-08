
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KeyboardShortcutsProps {
  onClose: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ onClose }) => {
  const shortcuts = [
    { key: 'Ctrl + S', description: 'Save current file' },
    { key: 'Ctrl + D', description: 'Duplicate current file' },
    { key: 'Ctrl + Enter', description: 'Run code' },
    { key: 'Alt + S', description: 'Show keyboard shortcuts' },
    { key: 'Ctrl + N', description: 'New file' },
    { key: 'Ctrl + O', description: 'Open file' },
    { key: 'Ctrl + F', description: 'Find in file' },
    { key: 'Ctrl + H', description: 'Find and replace' },
    { key: 'Ctrl + /', description: 'Toggle comment' },
    { key: 'Ctrl + Z', description: 'Undo' },
    { key: 'Ctrl + Y', description: 'Redo' },
    { key: 'Tab', description: 'Indent selection' },
    { key: 'Shift + Tab', description: 'Unindent selection' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-6 w-96 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Keyboard Shortcuts</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-[#3e3e42] last:border-b-0">
              <span className="text-gray-300 text-sm">{shortcut.description}</span>
              <div className="flex items-center space-x-1">
                {shortcut.key.split(' + ').map((key, keyIndex) => (
                  <div key={keyIndex} className="flex items-center">
                    {keyIndex > 0 && <span className="text-gray-500 text-xs mx-1">+</span>}
                    <kbd className="bg-[#1e1e1e] border border-[#3e3e42] rounded px-2 py-1 text-xs text-gray-300">
                      {key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#3e3e42]">
          <p className="text-xs text-gray-400 text-center">
            Press <kbd className="bg-[#1e1e1e] border border-[#3e3e42] rounded px-1 text-xs">Alt + S</kbd> anytime to view shortcuts
          </p>
        </div>
      </div>
    </div>
  );
};
