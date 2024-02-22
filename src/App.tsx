import { useRef } from "react";
import {
  ActionButtonsLayout,
  Content,
  MDXEditor,
  NotePreviewList,
  RootLayout,
  Settings,
  Sidebar,
  TitleBar,
} from "@/components";
import { useAtomValue } from "jotai";
import { viewAtom } from "@/store";
import { View } from "./libs";

function App() {
  const view = useAtomValue(viewAtom);
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
        <Content className="border-l bg-zinc-900/50 border-border">
          {view === View.Editor && <MDXEditor />}
          {view === View.Settings && <Settings />}
        </Content>
      </RootLayout>
    </div>
  );
}

export default App;
