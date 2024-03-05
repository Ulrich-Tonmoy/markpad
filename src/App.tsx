import { useCallback, useEffect, useRef } from "react";
import {
  ActionButtonsLayout,
  Content,
  MainBody,
  NotePreviewList,
  RootLayout,
  Sidebar,
  TitleBar,
} from "@/components";
import { useConfig } from "./hooks";
import { View } from "./libs";

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const {
    config,
    updateConfigData,
    view,
    updateView,
    openNotes,
    createEmptyNote,
    deleteNote,
  } = useConfig();

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "e":
          const updatedConfig = { ...config, showSidebar: !config.showSidebar };
          updateConfigData(updatedConfig);
          break;
        case "r":
          event.preventDefault();
          view == View.Recent ? updateView(View.Null) : updateView(View.Recent);
          break;
        case ",":
          view == View.Settings ? updateView(View.Null) : updateView(View.Settings);
          break;
        case "o":
          openNotes();
          break;
        case "n":
          createEmptyNote();
          break;
        case "d":
          deleteNote();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
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
          <MainBody />
        </Content>
      </RootLayout>
    </>
  );
}

export default App;
