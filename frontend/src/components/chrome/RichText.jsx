import ReactMarkdown from "react-markdown";

function renderLeaf(leaf, key) {
  let node = leaf.text;
  if (leaf.bold) node = <strong key={key}>{node}</strong>;
  if (leaf.italic) node = <em key={key}>{node}</em>;
  if (leaf.underline) node = <u key={key}>{node}</u>;
  if (leaf.strikethrough) node = <s key={key}>{node}</s>;
  if (leaf.code) node = <code key={key} className="px-1 py-0.5 bg-mist rounded text-[0.9em]">{node}</code>;
  return <span key={key}>{node}</span>;
}

function renderChildren(children) {
  return (children || []).map((child, i) => {
    if (child.type === "link") {
      return (
        <a key={i} href={child.url} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline hover:text-ink transition-colors">
          {renderChildren(child.children)}
        </a>
      );
    }
    return renderLeaf(child, i);
  });
}

function BlocksRenderer({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const Tag = `h${Math.min(Math.max(block.level || 2, 1), 6)}`;
            return (
              <Tag key={i} className="font-serif font-semibold text-ink leading-snug mt-6 first:mt-0" style={{ fontSize: block.level <= 2 ? "1.5em" : block.level === 3 ? "1.25em" : "1.1em" }}>
                {renderChildren(block.children)}
              </Tag>
            );
          }
          case "list": {
            const ListTag = block.format === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={i} className={`pl-5 space-y-1.5 ${block.format === "ordered" ? "list-decimal" : "list-disc"}`}>
                {(block.children || []).map((item, j) => (
                  <li key={j}>{renderChildren(item.children)}</li>
                ))}
              </ListTag>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-brand-blue bg-brand-blue-light/60 pl-4 py-2 italic text-ink">
                {renderChildren(block.children)}
              </blockquote>
            );
          case "code":
            return (
              <pre key={i} className="bg-[#152639] text-white text-xs rounded-md p-4 overflow-x-auto">
                <code>{(block.children || []).map((c) => c.text).join("")}</code>
              </pre>
            );
          case "image":
            return (
              <img key={i} src={block.image?.url} alt={block.image?.alternativeText || ""} className="rounded-md max-w-full my-4" />
            );
          case "paragraph":
          default: {
            const text = (block.children || []).map((c) => c.text || "").join("");
            if (!text.trim() && block.type === "paragraph") return null;
            return <p key={i}>{renderChildren(block.children)}</p>;
          }
        }
      })}
    </>
  );
}

const mdComponents = {
  h1: ({ children }) => <h1 className="font-serif font-semibold text-ink leading-snug mt-6 first:mt-0" style={{ fontSize: "1.5em" }}>{children}</h1>,
  h2: ({ children }) => <h2 className="font-serif font-semibold text-ink leading-snug mt-6 first:mt-0" style={{ fontSize: "1.5em" }}>{children}</h2>,
  h3: ({ children }) => <h3 className="font-serif font-semibold text-ink leading-snug mt-6 first:mt-0" style={{ fontSize: "1.25em" }}>{children}</h3>,
  h4: ({ children }) => <h4 className="font-serif font-semibold text-ink leading-snug mt-6 first:mt-0" style={{ fontSize: "1.1em" }}>{children}</h4>,
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => <ul className="pl-5 space-y-1.5 list-disc">{children}</ul>,
  ol: ({ children }) => <ol className="pl-5 space-y-1.5 list-decimal">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="border-l-4 border-brand-blue bg-brand-blue-light/60 pl-4 py-2 italic text-ink">{children}</blockquote>,
  code: ({ inline, children }) => inline
    ? <code className="px-1 py-0.5 bg-mist rounded text-[0.9em]">{children}</code>
    : <pre className="bg-[#152639] text-white text-xs rounded-md p-4 overflow-x-auto"><code>{children}</code></pre>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline hover:text-ink transition-colors">{children}</a>,
  img: ({ src, alt }) => <img src={src} alt={alt || ""} className="rounded-md max-w-full my-4" />,
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
};

export default function RichText({ blocks, className = "" }) {
  if (!blocks) return null;

  const isMarkdown = typeof blocks === "string";
  if (isMarkdown && !blocks.trim()) return null;
  if (!isMarkdown && (!Array.isArray(blocks) || blocks.length === 0)) return null;

  return (
    <div className={`font-sans text-sm md:text-[15px] text-ink-2 leading-relaxed space-y-4 ${className}`}>
      {isMarkdown
        ? <ReactMarkdown components={mdComponents}>{blocks}</ReactMarkdown>
        : <BlocksRenderer blocks={blocks} />}
    </div>
  );
}
