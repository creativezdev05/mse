import Image from "next/image";
import { ForgedLine } from "@/components/ui/ForgedLine";
import { cx } from "@/lib/cx";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

export function Photo({ src, alt, sizes, className }: PhotoProps) {
  return (
    <div className={cx("photo", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} />
    </div>
  );
}

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lede: string;
};

export function PageIntro({ eyebrow, title, lede }: PageIntroProps) {
  return (
    <header className="page-intro">
      <div className="layout-shell-wide cluster">
        <p className="type-label">{eyebrow}</p>
        <h1><ForgedLine text={title} /></h1>
        <p className="page-lede">{lede}</p>
      </div>
    </header>
  );
}
