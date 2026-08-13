import { NextResponse } from "next/server";
import { getResend } from "../../../lib/resend";
import { getSupabase } from "../../../lib/supabase";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not read that submission. Please refresh and try once more.",
      },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Please fill in the form and try again." },
      { status: 400 }
    );
  }

  const fields = body as {
    email?: unknown;
    name?: unknown;
    message?: unknown;
    newsletter?: unknown;
  };
  const email =
    typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";
  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const message =
    typeof fields.message === "string" ? fields.message.trim() : "";
  const newsletter = fields.newsletter === true;

  if (!email) {
    return NextResponse.json(
      { error: "Add your email so we can reply to you." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "That email does not look right. Check it and try again." },
      { status: 400 }
    );
  }

  if (!newsletter && !message) {
    return NextResponse.json(
      { error: "Tell us something — even just a hello." },
      { status: 400 }
    );
  }

  let supabase: ReturnType<typeof getSupabase>;

  try {
    supabase = getSupabase();
  } catch (configError) {
    console.error("Contact Supabase configuration error:", configError);
    return NextResponse.json(
      {
        error: newsletter
          ? "Subscriptions are temporarily unavailable. Please try again shortly."
          : "Messages are temporarily unavailable. Please email hello@orka.live instead.",
      },
      { status: 503 }
    );
  }

  const { error: dbError } = newsletter
    ? await supabase.from("contact").insert({ email, newsletter: true })
    : await supabase.from("contact").insert({
        email,
        name: name || null,
        message,
      });

  if (dbError) {
    if (dbError.code === "23505") {
      return NextResponse.json({
        success: true,
        message: "You're already on our list — no need to sign up twice.",
      });
    }

    console.error("Supabase insert error:", dbError);
    return NextResponse.json(
      {
        error:
          "We could not save that right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (newsletter) {
    try {
      const resend = getResend();
      const { data, error: emailError } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "You're subscribed to ORKA updates!",
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
            <h1 style="font-size: 24px; margin-bottom: 16px;">Welcome to ORKA updates${name ? `, ${escapeHtml(name)}` : ""}!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Thanks for subscribing. You'll be among the first to hear about new features, escrow automations, and ORKA's official launch.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #666; margin-top: 24px;">
              We're building the autonomous financial operating system for global service work, and we'll keep you in the loop every step of the way.
            </p>
            <p style="font-size: 14px; color: #999; margin-top: 32px;">
              — The ORKA team
            </p>
          </div>
        `,
      });

      if (emailError) {
        console.error("Resend email error:", emailError);
      } else {
        console.log("Resend email sent:", data?.id);
      }
    } catch (emailError) {
      console.error("Resend email error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "You've subscribed to ORKA updates.",
    });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || "hello@orka.live";
  const safeName = name ? escapeHtml(name) : "a visitor";
  const safeMessage = escapeHtml(message);

  try {
    const resend = getResend();
    const { data, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New ORKA contact message${name ? ` from ${safeName}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h1 style="font-size: 20px; margin-bottom: 16px;">New contact message</h1>
          <table cellpadding="0" cellspacing="0" style="font-size: 15px; line-height: 1.6; color: #333;">
            <tr><td style="padding: 4px 0;"><strong>Name:</strong></td><td style="padding: 4px 0 4px 16px;">${safeName}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Email:</strong></td><td style="padding: 4px 0 4px 16px;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 4px 0; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 4px 0 4px 16px; white-space: pre-wrap;">${safeMessage}</td></tr>
          </table>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
    } else {
      console.log("Resend email sent:", data?.id);
    }
  } catch (emailError) {
    console.error("Resend email error:", emailError);
  }

  return NextResponse.json({
    success: true,
    message: "Message sent — we usually reply within one business day.",
  });
}