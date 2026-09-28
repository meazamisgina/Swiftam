"use server";

import { z } from "zod";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const demoSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required"),
  phone: z.string().trim().min(8, "Valid phone required"),
  email: z.string().trim().email("Invalid email address"),
  company: z.string().trim().min(2, "Company is required"),
  fleetSize: z.string().trim().min(1, "Select fleet size"),
  language: z.string().trim().min(1, "Select language"),
  challenge: z.string().trim().optional(),
});

export async function submitDemoRequest(formData: FormData) {
  const rawData = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    company: formData.get("company"),
    fleetSize: formData.get("fleetSize"),
    language: formData.get("language"),
    challenge: formData.get("challenge"),
  };

  const validatedFields = demoSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: "Invalid form data. Please check your inputs.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const formattedPhone = data.phone.startsWith("+")
    ? data.phone
    : `+251 ${data.phone.replace(/^0+/, "")}`;

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "SWIFTIAM Website <onboarding@resend.dev>";
  const toEmail = process.env.DEMO_NOTIFICATION_EMAIL;

  if (!resend || !toEmail) {
    console.error("Missing email configuration: check RESEND_API_KEY and DEMO_NOTIFICATION_EMAIL.");
    return { error: "Service temporarily unavailable. Please try again later." };
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email, 
      subject: `New Demo Request: ${data.company}`,
      text: [
        "New Demo Request Received:",
        "",
        `Name: ${data.fullName}`,
        `Company: ${data.company}`,
        `Email: ${data.email}`,
        `Phone: ${formattedPhone}`,
        `Fleet Size: ${data.fleetSize}`,
        `Language: ${data.language}`,
        "",
        "Challenge / Needs:",
        data.challenge || "None provided",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend API error:", error);
      return { error: "Failed to send demo request. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Email submission failed:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}