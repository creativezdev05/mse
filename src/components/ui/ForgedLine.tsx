export function splitForged(value: string) {
  const clean = value.trim().replace(/\s+/g, " ");
  const gap = clean.lastIndexOf(" ");

  if (gap === -1) {
    return { base: "", iron: clean };
  }

  return {
    base: `${clean.slice(0, gap)} `,
    iron: clean.slice(gap + 1),
  };
}

export function ForgedLine({ text }: { text: string }) {
  const { base, iron } = splitForged(text);

  return (
    <>
      <span className="forged-base" data-forge="base">
        {base}
      </span>
      <span className="forged-iron">
        <span className="forged-iron-metal" data-forge="iron">
          {iron}
        </span>
      </span>
    </>
  );
}

export function ForgedHeroTitle({ text }: { text: string }) {
  return (
    <>
      <span className="forged-line forged-line-dark" data-copy-text>
        <ForgedLine text={text} />
      </span>
      <span className="forged-line forged-line-light" aria-hidden="true">
        <ForgedLine text={text} />
      </span>
    </>
  );
}
