import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
// --- Custom CodeBlock Component ---
const CodeBlock = ({ language, children }) => {
// Children is the code string
const codeString = String(children).replace(/\n$/, "");
const [copied, setCopied] = useState(false);
const copyCode = () => {
navigator.clipboard.writeText(codeString);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};
return (
<div className="relative my-6 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 border-b border-gray-200">
{/* Code Header (Language and Copy Button) */}
<div className="flex items-center justify-between px-4 py-2 border-b border-gray-100
bg-gray-50">
{/* Language Label */}
<span className="flex items-center space-x-2 text-xs font-semibold text-gray-600
uppercase tracking-wide">
<LuCode size={16} className="text-gray-500" />
<span>{language || "Code"}</span>
</span>
{/* Copy Button */}
<button
onClick={copyCode}
aria-label="Copy code"
className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700
focus:outline-none relative group"
>
{copied ? (
<>
<LuCheck size={16} className="text-green-500" />
<span>Copied!</span>
</>
) : (
<>
<LuCopy size={16} />
<span>Copy</span>
</>
)}
</button>
</div>
{/* Syntax Highlighting */}
<SyntaxHighlighter
style={oneLight}
language={language || "text"}
showLineNumbers={false}
customStyle={{
margin: 0,
padding: '1rem',
backgroundColor: 'transparent',
overflowX: 'auto',
borderRadius: '0 0 0.5rem 0.5rem',
}}
>
{codeString}
</SyntaxHighlighter>
</div>
);
};
// --- AIResponsePreview Component ---
const AIResponsePreview = ({ content }) => {
if (!content) {
return null;
}
// Custom component mapping for ReactMarkdown to apply Tailwind CSS
const components = {
code: ({ inline, className, children, ...props }) => {
const match = /language-(\w+)/.exec(className || "");
const language = match ? match[1] : "";
if (inline) {
// Inline code styling
return (
<code className="px-1 py-0.5 bg-gray-100 rounded text-sm" {...props}>
{children}
</code>
);
}
// Block code uses the custom CodeBlock component
return (
<CodeBlock
language={language}
children={children} // Pass children directly for CodeBlock to handle as string
{...props}
/>
);
},
// Standard HTML element mappings with Tailwind styles
h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
h2: ({ children }) => <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>,
p: ({ children }) => <p className="mb-4 leading-5 text-sm">{children}</p>,
a: ({ href, children }) => <a href={href} className="text-blue-500
hover:underline">{children}</a>,
ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>,
ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>,
li: ({ children }) => <li className="mb-1">{children}</li>,
blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-200 pl-4 italic
my-4">{children}</blockquote>,
table: ({ children }) => (
<div className="overflow-x-auto my-4">
<table className="min-w-full divide-y divide-gray-300 border
border-gray-200">{children}</table>
</div>
),
thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
th: ({ children }) => <th className="px-3 py-2 text-left text-xs font-medium text-gray-500
uppercase tracking-wider whitespace-nowrap">{children}</th>,
td: ({ children }) => <td className="px-3 py-2 whitespace-nowrap text-sm
text-gray-700">{children}</td>,
};
return (
<div className="max-w-4xl w-full mx-auto">
{/* 'prose' classes provide standard markdown typography defaults */}
<div className="text-sm prose dark:prose-invert prose-slate max-w-none">
<ReactMarkdown
remarkPlugins={[remarkGfm]}
components={components}
>
{content}
</ReactMarkdown>
</div>
</div>
);
};
export default AIResponsePreview;