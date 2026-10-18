interface WordmarkProps {
  className?: string;
}

/** Temporary typography-only identity until the final mark is commissioned. */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={`font-display inline-block text-[1.28rem] tracking-[-0.02em] ${className ?? ""}`}
    >
      eNotaryHub
    </span>
  );
}
