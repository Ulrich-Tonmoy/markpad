import { View } from "@/libs";
import { MDXEditor, Settings } from "@/components";
import { useAtomValue } from "jotai";
import { viewAtom } from "@/store";

export const EditorBody = () => {
  const view = useAtomValue(viewAtom);

  return (
    <>
      {view === View.Null && <div>Welcome</div>}
      {view === View.Editor && <MDXEditor />}
      {view === View.Settings && <Settings />}
      {view === View.Recent && <div>Recent</div>}
    </>
  );
};
