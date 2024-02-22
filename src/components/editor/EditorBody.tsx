import { View } from "@/libs";
import { MDXEditor, Settings } from "@/components";
import { useAtomValue } from "jotai";
import { viewAtom } from "@/store";

export const EditorBody = () => {
  const view = useAtomValue(viewAtom);

  return (
    <div>
      {view === View.Editor && (
        <>
          <MDXEditor updateCounts={updateCounts} />
        </>
      )}
      {view === View.Settings && <Settings />}
    </div>
  );
};
