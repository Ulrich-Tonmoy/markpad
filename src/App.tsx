import { invoke } from "@tauri-apps/api/tauri";
import { TitleBar } from "./components";

function App() {
  invoke("greet", { name: "name" });

  return (
    <div className="wrapper">
      <TitleBar />
      <div className="main flex items-start h-screen overflow-hidden bg-primary">
        <span className="text-4xl text-purple-500">Obsidian</span>
      </div>
    </div>
  );
}

export default App;
