import { useRef } from "react";
import {
  ActionButtonsLayout,
  Content,
  Editor,
  NotePreviewList,
  RootLayout,
  Sidebar,
  TitleBar,
} from "./components";

function App() {

  const contentContainerRef = useRef<HTMLDivElement>(null);

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0);
  };

  return (
    <div>
      <TitleBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsLayout className="flex justify-between" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <Editor />
        </Content>
      </RootLayout>
    </div>
  );
}

export default App;
