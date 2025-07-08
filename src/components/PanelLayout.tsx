
import React from 'react';
import SplitPane from 'react-split-pane';

interface PanelLayoutProps {
  fileExplorer: React.ReactNode;
  codeEditor: React.ReactNode;
}

export const PanelLayout: React.FC<PanelLayoutProps> = ({
  fileExplorer,
  codeEditor,
}) => {
  return (
    <div className="flex-1">
      <SplitPane
        split="vertical"
        minSize={200}
        maxSize={400}
        defaultSize={250}
        style={{ position: 'relative' }}
        paneStyle={{ overflow: 'hidden' }}
        resizerStyle={{
          background: '#3e3e42',
          width: '1px',
          cursor: 'col-resize',
          margin: '0 2px',
        }}
      >
        <div className="h-full bg-[#252526] border-r border-[#3e3e42]">
          {fileExplorer}
        </div>
        <div className="h-full">
          <SplitPane
            split="vertical"
            minSize={400}
            defaultSize="75%"
            style={{ position: 'relative' }}
            paneStyle={{ overflow: 'hidden' }}
            resizerStyle={{
              background: '#3e3e42',
              width: '1px',
              cursor: 'col-resize',
              margin: '0 2px',
            }}
          >
            <div className="h-full bg-[#1e1e1e]">
              {codeEditor}
            </div>
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
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  );
};
