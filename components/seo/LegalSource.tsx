export const RULES_URL =
  "https://sc.judiciary.gov.ph/24-10-14-sc-rules-on-electronic-notarization/";
export const RULES_FULL_TEXT_URL =
  "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/11/98644";

export function LegalSource() {
  return (
    <aside className="border-mullion-soft mt-16 border-t pt-6" aria-labelledby="primary-source-title">
      <p id="primary-source-title" className="font-mono-label text-narra-3">
        Primary source
      </p>
      {/* Wider than `measure` so it reads as one continuous footnote rather
          than a half-width column, but still capped: at full page width the
          line outran the eye and the return sweep got lost. */}
      <p className="text-narra-2 text-small mt-3 max-w-[80ch] text-justify hyphens-auto">
        This overview refers to A.M. No. 24-10-14-SC, the Rules on Electronic
        Notarization issued by the Supreme Court of the Philippines on February
        4, 2025. Read the{" "}
        <a className="text-sun-ink underline underline-offset-2" href={RULES_URL}>
          official publication
        </a>{" "}
        or the{" "}
        <a
          className="text-sun-ink underline underline-offset-2"
          href={RULES_FULL_TEXT_URL}
        >
          searchable full text
        </a>
        . This site provides general information, not legal advice.
      </p>
    </aside>
  );
}
