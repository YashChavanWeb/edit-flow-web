
import React from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

interface PanelLayoutProps {
  fileExplorer: React.ReactNode;
  codeEditor: React.ReactNode;
  codeOutput: React.ReactNode;
}

export const PanelLayout: React.FC<PanelLayoutProps> = ({
  fileExplorer,
  codeEditor,
  codeOutput,
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
            {codeOutput}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
