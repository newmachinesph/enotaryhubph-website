"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type FieldError, type UseFormRegister } from "react-hook-form";

import { getCopy } from "@/content";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { initialInquiryState, submitInquiry } from "./actions";

const fieldClass =
  "gather border-mullion bg-pearl focus-visible:border-sun-ink focus-visible:ring-sun-ink w-full border px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-inset";

export function ContactForm() {
  const copy = getCopy();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", org: "", message: "", website: "" },
  });

  if (submitted) {
    return (
      <div className="capiz-panel capiz-panel--lit p-10" role="status" aria-live="polite">
        <p className="font-display text-[1.6rem] leading-tight">{copy.contact.success}</p>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    setServerError(false);
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => data.set(key, value ?? ""));
    const result = await submitInquiry(initialInquiryState, data);

    if (result.status === "success") return setSubmitted(true);
    if (result.errors) {
      Object.entries(result.errors).forEach(([name, message]) =>
        setError(name as "name" | "email" | "message", { message }),
      );
    } else setServerError(true);
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7">
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <Field name="name" label={copy.contact.nameLabel} placeholder={copy.contact.namePlaceholder} error={errors.name} register={register} autoComplete="name" required />
      <Field name="email" type="email" label={copy.contact.emailLabel} placeholder={copy.contact.emailPlaceholder} error={errors.email} register={register} autoComplete="email" required />
      <Field name="org" label={copy.contact.orgLabel} placeholder={copy.contact.orgPlaceholder} error={errors.org} register={register} autoComplete="organization" />
      <Field name="message" label={copy.contact.messageLabel} placeholder={copy.contact.messagePlaceholder} error={errors.message} register={register} multiline required />

      <button type="submit" disabled={isSubmitting} className="gather bg-narra text-pearl hover:bg-sun-ink w-full px-7 py-3 text-[0.95rem] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit">
        {isSubmitting ? copy.contact.submitting : copy.contact.submit}
      </button>

      {serverError ? <p className="text-sun-ink text-small" role="alert">{copy.contact.errorGeneric}</p> : null}
    </form>
  );
}

interface FieldProps {
  name: "name" | "email" | "org" | "message";
  label: string;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  register: UseFormRegister<ContactInput>;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
}

function Field({ name, label, placeholder, type = "text", error, register, autoComplete, required, multiline }: FieldProps) {
  const errorId = `${name}-error`;
  const props = {
    id: name,
    placeholder,
    autoComplete,
    required,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: fieldClass,
    ...register(name),
  };

  return (
    <div>
      <label htmlFor={name} className="font-mono-label text-narra-3 mb-2 block">{label}</label>
      {multiline ? <textarea {...props} rows={6} maxLength={4000} /> : <input {...props} type={type} maxLength={name === "email" ? 254 : name === "org" ? 160 : 120} />}
      <p id={errorId} className="text-sun-ink min-h-[1.35rem] pt-1.5 text-[0.83rem]" role={error ? "alert" : undefined}>{error?.message ?? ""}</p>
    </div>
  );
}
