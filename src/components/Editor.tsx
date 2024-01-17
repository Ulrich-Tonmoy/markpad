import {
  MDXEditor,
  codeBlockPlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
} from "@mdxeditor/editor";
import { useEditor } from "@/hooks";

export const Editor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useEditor();

  if (!selectedNote) return null;

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        imagePlugin(),
        tablePlugin(),
        codeBlockPlugin(),
        markdownShortcutPlugin(),
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-4 py-2.5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  );
};
