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

export const Editor = () => {

  return (
    <MDXEditor
      markdown={"# selectedNote.content"}
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
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-4 py-0.5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  );
};
