import { invoke } from "@tauri-apps/api/tauri";
import {
  ActionButtonsLayout,
  Content,
  RootLayout,
  Sidebar,
  TitleBar,
} from "./components";

function App() {
  invoke("greet", { name: "name" });

  return (
    <div>
      <TitleBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsLayout className="flex justify-between" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">Content</Content>
      </RootLayout>
    </div>
  );
}

export default App;
