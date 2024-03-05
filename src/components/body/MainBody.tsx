import { ViewState } from "@/libs";
import { viewAtom } from "@/store";
import { MDXEditor, RecentFolderList, Settings, WelcomePage } from "@/components";
import { useAtomValue } from "jotai";

export const MainBody = () => {
  const view = useAtomValue(viewAtom);

  return (
    <>
      {view === ViewState.Null && <WelcomePage />}
      {view === ViewState.Editor && <MDXEditor />}
      {view === ViewState.Settings && <Settings />}
      {view === ViewState.Recent && <RecentFolderList />}
    </>
  );
};
