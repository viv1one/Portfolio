import type { MDXComponents } from "mdx/types";
import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  UnorderedList,
  OrderedList,
  ListItem,
  MDXImage,
  Blockquote,
  CodeBlock,
  InlineCode
} from "@components/heading";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    p: Paragraph,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    img: MDXImage,
    blockquote: Blockquote,
    pre: CodeBlock,
    code: InlineCode,
    ...components
  };
}

