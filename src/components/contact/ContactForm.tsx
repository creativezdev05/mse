"use client";

import { useId, useState, type FormEvent } from "react";
import type { ServiceOption } from "@/data/content";

type Fields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type FieldName = keyof Fields;

type ContactFormProps = {
  services: readonly ServiceOption[];
  submitLabel: string;
  successMessage: string;
  failureMessage: string;
};

const empty: Fields = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

function validate(values: Fields) {
  const errors: Partial<Record<FieldName, string>> = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }

  if (!/^[0-9+()\-\s]{7,}$/.test(values.phone.trim())) {
    errors.phone = "Enter a phone number we can call.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.service) {
    errors.service = "Choose a service.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Add a short note about the plot or the work.";
  }

  return errors;
}

export function ContactForm({
  services,
  submitLabel,
  successMessage,
  failureMessage,
}: ContactFormProps) {
  const formId = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "failed") {
      setStatus("idle");
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as FieldName[]).find((key) => nextErrors[key]);

    if (firstInvalid) {
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          service: values.service,
          message: values.message.trim(),
        }),
      });

      if (!response.ok) {
        setStatus("failed");
        return;
      }

      setValues(empty);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <p className="form-success" role="status">
        {successMessage}
      </p>
    );
  }

  function fieldProps(name: FieldName) {
    const error = errors[name];
    const errorId = error ? `${formId}-${name}-error` : undefined;

    return {
      id: `${formId}-${name}`,
      name,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": errorId,
      error,
      errorId,
    };
  }

  const nameField = fieldProps("name");
  const phoneField = fieldProps("phone");
  const emailField = fieldProps("email");
  const serviceField = fieldProps("service");
  const messageField = fieldProps("message");

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label htmlFor={nameField.id}>
          Name
          <input
            id={nameField.id}
            name={nameField.name}
            type="text"
            autoComplete="name"
            value={values.name}
            aria-invalid={nameField["aria-invalid"]}
            aria-describedby={nameField["aria-describedby"]}
            onChange={(event) => update("name", event.target.value)}
          />
          {nameField.error ? (
            <span className="field-error" id={nameField.errorId}>
              {nameField.error}
            </span>
          ) : null}
        </label>
        <label htmlFor={phoneField.id}>
          Phone
          <input
            id={phoneField.id}
            name={phoneField.name}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            aria-invalid={phoneField["aria-invalid"]}
            aria-describedby={phoneField["aria-describedby"]}
            onChange={(event) => update("phone", event.target.value)}
          />
          {phoneField.error ? (
            <span className="field-error" id={phoneField.errorId}>
              {phoneField.error}
            </span>
          ) : null}
        </label>
      </div>
      <label htmlFor={emailField.id}>
        Email
        <input
          id={emailField.id}
          name={emailField.name}
          type="email"
          autoComplete="email"
          value={values.email}
          aria-invalid={emailField["aria-invalid"]}
          aria-describedby={emailField["aria-describedby"]}
          onChange={(event) => update("email", event.target.value)}
        />
        {emailField.error ? (
          <span className="field-error" id={emailField.errorId}>
            {emailField.error}
          </span>
        ) : null}
      </label>
      <label htmlFor={serviceField.id}>
        Service
        <select
          id={serviceField.id}
          name={serviceField.name}
          value={values.service}
          aria-invalid={serviceField["aria-invalid"]}
          aria-describedby={serviceField["aria-describedby"]}
          onChange={(event) => update("service", event.target.value)}
        >
          <option value="">Select a service</option>
          {services.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {serviceField.error ? (
          <span className="field-error" id={serviceField.errorId}>
            {serviceField.error}
          </span>
        ) : null}
      </label>
      <label htmlFor={messageField.id}>
        Message
        <textarea
          id={messageField.id}
          name={messageField.name}
          rows={5}
          value={values.message}
          aria-invalid={messageField["aria-invalid"]}
          aria-describedby={messageField["aria-describedby"]}
          onChange={(event) => update("message", event.target.value)}
        />
        {messageField.error ? (
          <span className="field-error" id={messageField.errorId}>
            {messageField.error}
          </span>
        ) : null}
      </label>
      {status === "failed" ? (
        <p className="field-error" role="alert">
          {failureMessage}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : submitLabel}
      </button>
    </form>
  );
}
