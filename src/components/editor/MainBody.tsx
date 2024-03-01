import { View } from "@/libs";
import { MDXEditor, RecentFolderList, Settings } from "@/components";
import { useAtomValue } from "jotai";
import { viewAtom } from "@/store";

export const MainBody = () => {
  const view = useAtomValue(viewAtom);

  return (
    <>
      {view === View.Null && <div>Welcome</div>}
      {view === View.Editor && <MDXEditor />}
      {view === View.Settings && <Settings />}
      {view === View.Recent && <RecentFolderList />}
    </>
  );
};
