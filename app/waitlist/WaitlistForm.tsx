"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { waitlistSchema, type WaitlistInput } from "@/lib/validation";
import { useSubmissionStore } from "@/stores/submission";
import { initialWaitlistState, joinWaitlist } from "./actions";

const fieldClass =
  "gather border-mullion bg-pearl focus-visible:border-sun-ink focus-visible:ring-sun-ink w-full border px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-inset";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const joinedWaitlist = useSubmissionStore((state) => state.joinedWaitlist);
  const markWaitlistJoined = useSubmissionStore((state) => state.markWaitlistJoined);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", name: "", organization: "", audience: "individual", website: "" },
  });

  if (joinedWaitlist) {
    return (
      <div className="capiz-panel capiz-panel--lit p-8" role="status" aria-live="polite">
        <p className="font-display text-[1.6rem] leading-tight">You&rsquo;re on the launch list.</p>
        <p className="text-narra-2 mt-3 text-small">We&rsquo;ll write when there is a concrete release update.</p>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => data.set(key, value ?? ""));
    const result = await joinWaitlist(initialWaitlistState, data);
    if (result.status === "success") markWaitlistJoined();
    else setError("root", { message: result.message });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={compact ? "home-waitlist-website" : "waitlist-website"}>Website</label>
        <input id={compact ? "home-waitlist-website" : "waitlist-website"} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <label className="grid gap-2" htmlFor={compact ? "home-waitlist-email" : "waitlist-email"}>
        <span className="font-mono-label text-narra-3">Email</span>
        <input id={compact ? "home-waitlist-email" : "waitlist-email"} type="email" autoComplete="email" maxLength={254} className={fieldClass} placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "waitlist-email-error" : undefined} {...register("email")} />
        <span id="waitlist-email-error" className="text-sun-ink min-h-[1.25rem] text-[0.83rem]" role={errors.email ? "alert" : undefined}>{errors.email?.message ?? ""}</span>
      </label>

      {!compact ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2" htmlFor="waitlist-name"><span className="font-mono-label text-narra-3">Name</span><input id="waitlist-name" autoComplete="name" maxLength={120} className={fieldClass} {...register("name")} /></label>
            <label className="grid gap-2" htmlFor="waitlist-organization"><span className="font-mono-label text-narra-3">Organization</span><input id="waitlist-organization" autoComplete="organization" maxLength={160} className={fieldClass} {...register("organization")} /></label>
          </div>
          <label className="grid gap-2" htmlFor="waitlist-audience"><span className="font-mono-label text-narra-3">I am joining as</span><select id="waitlist-audience" className={fieldClass} {...register("audience")}><option value="individual">An individual</option><option value="business">A business team</option><option value="notary">A notary</option><option value="other">Something else</option></select></label>
        </>
      ) : (
        <input type="hidden" value="individual" {...register("audience")} />
      )}

      <button type="submit" disabled={isSubmitting} className="gather bg-narra text-pearl hover:bg-sun-ink w-full px-7 py-3 text-[0.95rem] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit">{isSubmitting ? "Joining…" : "Join the launch list"}</button>
      {errors.root ? <p role="alert" className="text-sun-ink text-small">{errors.root.message}</p> : null}
    </form>
  );
}
