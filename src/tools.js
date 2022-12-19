// tools.js
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  list: List,
  image: Image,
  warning: Warning,
  code: Code,
  // linkTool: LinkTool,
  header: Header,
  quote: Quote,
  marker: Marker,
  delimiter: Delimiter,
  checklist: CheckList,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
