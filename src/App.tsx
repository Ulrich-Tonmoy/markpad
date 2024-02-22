import { useRef } from "react";
import {
  ActionButtonsLayout,
  Content,
  EditorBody,
  NotePreviewList,
  RootLayout,
  Sidebar,
  TitleBar,
} from "@/components";

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0);
  };

  return (
    <div>
      <TitleBar />
      <RootLayout>
        <Sidebar className="p-2 pr-1">
          <ActionButtonsLayout className="flex justify-between" />
          <NotePreviewList
            className="h-[95%] px-2 mt-1 space-y-2 overflow-auto"
            onSelect={resetScroll}
          />
        </Sidebar>
        <Content className="border-l bg-editor border-border">
          <EditorBody />
        </Content>
      </RootLayout>
    </div>
  );
}

export default App;
