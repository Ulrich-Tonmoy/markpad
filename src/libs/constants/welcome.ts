export const welcome = `
> You can toggle 'Welcome Content' 'Editor Toolbar' 'Open Note By Default' 'Theme' from settings.

# Welcome to Obsidian 👋🏻

Obsidian is a simple **note-taking app** that uses **Markdown** syntax to format your notes.

You can create your first note by clicking on the top-left icon on the sidebar, or delete one by clicking on top right icon.

Following there's a quick overview of the currently supported Markdown syntax.

### In here, you can find the following markdown elements:

* Headings
* Lists
  * Unordered
  * Ordered
  * Check lists
  * And nested ;)
* Links
* Bold/Italic/Underline formatting
* Tables
* Code block editors
* And much more.

## Headings

* Use one to six # characters to create a heading. The number of # characters determines the heading level.

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Lists

* Use \* or - to create a list item.
* User Number 1. to create Number list
* Use \* \[ ] for check list

For example, you can add a list of bullet points:

### Unordered List

* Bullet point 1
* Bullet point 2
* Bullet point 3

### Numbered list

Here we have a numbered list:

1. Numbered list item 1
2. Numbered list item 2
3. Numbered list item 3

### Check list

* [x] Check list item 1
* [ ] Check list item 2
* [ ] Check list item 3

## Text formatting

* Select a text and press Ctrl + B to make it bold, Ctrl + I to make it italic and Ctrl + U to underline.

This is a **bold** text.
This is an *italic* text.
This is an<u> underline </u>text.

## Blockquote

* Use > to create a block quote.

> This is a blockquote. You can use it to emphasize some text or to cite someone.

## Code blocks

* Use \` to create inline code.

\`inline code\`

## A code sample

* Type \`\`\`\\<lang\> (with \\<lang\> being any supported language extension) to insert a code block.
  Obsidian embeds CodeMirror for code editing.

\`\`\`tsx
export default function App() {
  return (<div>Hello world</div>)
}
\`\`\`

## A table

Play with the table below - add rows, columns, change column alignment. When editing,
you can navigate the cells with \`enter\`, \`shift+enter\`, \`tab\` and \`shift+tab\`.

| Item              | In Stock | Price |
| :---------------- | :------: | ----: |
| Python Hat        |   True   | 23.99 |
| SQL Hat           |   True   | 23.99 |
| Codecademy Tee    |   False  | 19.99 |
| Codecademy Hoodie |   False  | 42.99 |
`;
