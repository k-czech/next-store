import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return false;
          }
          return <Link href={href} {...props}></Link>;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
