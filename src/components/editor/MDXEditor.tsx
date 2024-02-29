import {
  MDXEditor as Editor,
  toolbarPlugin,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  tablePlugin,
  thematicBreakPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  DiffSourceToggleWrapper,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  BlockTypeSelect,
  InsertTable,
  InsertThematicBreak,
  InsertAdmonition,
  InsertCodeBlock,
  linkPlugin,
  imagePlugin,
  InsertImage,
} from "@mdxeditor/editor";
import { useEditor } from "@/hooks";
import "./MDXEditor.css";
import { useAtomValue } from "jotai";
import { configAtom } from "@/store";

export const MDXEditor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useEditor();

  const config = useAtomValue(configAtom);

  if (!selectedNote) return null;

  const allPlugins = (diffMarkdown: string) => {
    const plugins = [
      listsPlugin(),
      linkPlugin(),
      quotePlugin(),
      headingsPlugin(),
      tablePlugin(),
      thematicBreakPlugin(),
      codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
      codeMirrorPlugin({
        codeBlockLanguages: {
          txt: "text",
          html: "Html",
          css: "CSS",
          js: "JavaScript",
          json: "JSON",
          ts: "TypeScript",
          jsx: "JavaScript",
          tsx: "TypeScript",
          hpp: "C++",
          cpp: "C++",
          zig: "Zig",
          h: "C",
          c: "C",
          cs: "C#",
          py: "Python",
          rs: "Rust",
          go: "Go",
        },
      }),
      imagePlugin(),
      directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
      diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
      markdownShortcutPlugin(),
    ];

    if (config.showEditorToolbar) {
      plugins.unshift(
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <InsertCodeBlock />
              <ListsToggle />
              <BlockTypeSelect />
              <InsertTable />
              <InsertImage />
              <InsertThematicBreak />
              <InsertAdmonition />
            </DiffSourceToggleWrapper>
          ),
        }),
      );
    }

    return plugins;
  };

  return (
    <Editor
      className="dark-theme dark-editor dark-source"
      ref={editorRef}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={allPlugins(selectedNote.content)}
      contentEditableClassName="outline-none min-h-[calc(100vh-28px)] max-w-none md:text-lg text-sm px-4 py-2.5 caret-cursor prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] popupContainer:z-10"
    />
  );
};
