import { MarkdownResult } from "@/types/utils";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

interface MarkdownProps {
  children: MarkdownResult;
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, children, ...props }) => {
          if (!href) return null;
          if (href?.includes("http://" || "https://")) {
            return (
              <a href={href} rel="noopener noreferrer" {...props}>
                {children}
              </a>
            );
          }
          return <Link href={href}>{children}</Link>;
        },
      }}
    />
  );
};
