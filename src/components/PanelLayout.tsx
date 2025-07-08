
import React from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

interface PanelLayoutProps {
  fileExplorer: React.ReactNode;
  codeEditor: React.ReactNode;
}

export const PanelLayout: React.FC<PanelLayoutProps> = ({
  fileExplorer,
  codeEditor,
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full bg-[#252526] border-r border-[#3e3e42]">
          {fileExplorer}
        </div>
      </ResizablePanel>
      
      <ResizableHandle className="w-1 bg-[#3e3e42] hover:bg-[#464647] transition-colors" />
      
      <ResizablePanel defaultSize={80}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={75} minSize={40}>
            <div className="h-full bg-[#1e1e1e]">
              {codeEditor}
            </div>
          </ResizablePanel>
          
          <ResizableHandle className="w-1 bg-[#3e3e42] hover:bg-[#464647] transition-colors" />
          
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full bg-[#252526] border-l border-[#3e3e42]">
              <div className="h-full flex flex-col">
                <div className="h-8 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center px-3">
                  <span className="text-xs text-gray-300">Input/Output</span>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 border-b border-[#3e3e42]">
                    <div className="h-6 bg-[#2d2d30] flex items-center px-2">
                      <span className="text-xs text-gray-400">Input</span>
                    </div>
                    <textarea
                      className="w-full h-full bg-[#1e1e1e] text-white p-2 text-sm resize-none border-none outline-none"
                      placeholder="Enter input for your program..."
                    />
                  </div>
                  <div className="flex-1">
                    <div className="h-6 bg-[#2d2d30] flex items-center px-2">
                      <span className="text-xs text-gray-400">Output</span>
                    </div>
                    <div className="w-full h-full bg-[#1e1e1e] text-white p-2 text-sm overflow-auto">
                      <div className="text-gray-400">Output will appear here...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
