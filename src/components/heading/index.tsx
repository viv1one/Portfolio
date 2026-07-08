import { type ComponentPropsWithoutRef } from 'react';
import NextImage from 'next/image';

// Heading components
export function Heading1(props: ComponentPropsWithoutRef<'h1'>) {
  return <h1 className="text-4xl font-bold my-4 text-gray-900 dark:text-gray-100" {...props} />;
}

export function Heading2(props: ComponentPropsWithoutRef<'h2'>) {
  return <h2 className="text-3xl font-semibold my-3 text-gray-800 dark:text-gray-200" {...props} />;
}

export function Heading3(props: ComponentPropsWithoutRef<'h3'>) {
  return <h3 className="text-2xl font-medium my-2 text-gray-700 dark:text-gray-300" {...props} />;
}

// Paragraph component
export function Paragraph(props: ComponentPropsWithoutRef<'div'>) {
  return <div className="text-base leading-7 my-4 text-gray-700 dark:text-gray-300" {...props} />;
}

// List components
export function UnorderedList(props: ComponentPropsWithoutRef<'ul'>) {
  return <ul className="list-disc list-inside my-4 ml-6 text-gray-700 dark:text-gray-300" {...props} />;
}

export function OrderedList(props: ComponentPropsWithoutRef<'ol'>) {
  return <ol className="list-decimal list-inside my-4 ml-6 text-gray-700 dark:text-gray-300" {...props} />;
}

export function ListItem(props: ComponentPropsWithoutRef<'li'>) {
  return <li className="my-2" {...props} />;
}

// Image component - using next/image for optimization
export function MDXImage(props: ComponentPropsWithoutRef<'img'>) {
  const { src, alt, ...rest } = props;
  return (
    <NextImage
      src={src}
      alt={alt}
      className="max-w-full h-auto my-4 rounded-lg shadow-md"
      {...rest}
    />
  );
}

// Blockquote component
export function Blockquote(props: ComponentPropsWithoutRef<'blockquote'>) {
  return <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-700 dark:text-gray-300 my-4" {...props} />;
}

// Code block component
export function CodeBlock(props: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto">
      <code className="text-sm font-mono text-gray-800 dark:text-gray-200" {...props} />
    </pre>
  );
}

// Inline code component
export function InlineCode(props: ComponentPropsWithoutRef<'code'>) {
  return <code className="bg-gray-100 dark:bg-gray-800 text-sm font-mono px-1 rounded" {...props} />;
}
