import { Icon } from "@/lib/icons";
import { FACEBOOK_URL, INSTAGRAM_URL, TIKTOK_URL } from "@/lib/social-links";

const SOCIALS = [
  { label: "Facebook", icon: "Facebook", url: FACEBOOK_URL },
  { label: "Instagram", icon: "Instagram", url: INSTAGRAM_URL },
  { label: "TikTok", icon: "TikTok", url: TIKTOK_URL },
];

export default function SocialRail({ facebookUrl, instagramUrl, tiktokUrl }) {
  const socials = [
    { ...SOCIALS[0], url: facebookUrl || SOCIALS[0].url },
    { ...SOCIALS[1], url: instagramUrl || SOCIALS[1].url },
    { ...SOCIALS[2], url: tiktokUrl || SOCIALS[2].url },
  ].filter((s) => s.url);

  if (!socials.length) return null;

  return (
    <div className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {socials.map((s) => {
        const SocialIcon = Icon[s.icon];
        return (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            aria-label={s.label}
            className="w-10 h-10 rounded-full bg-white border border-divider shadow-lg flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            <SocialIcon size={17} stroke={1.8} />
          </a>
        );
      })}
    </div>
  );
}
