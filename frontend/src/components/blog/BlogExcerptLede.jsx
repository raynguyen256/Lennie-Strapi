export default function BlogExcerptLede({ excerpt }) {
  if (!excerpt) return null;
  return <p className="font-serif text-xl md:text-2xl text-ink font-light leading-relaxed italic mb-10">{excerpt}</p>;
}
