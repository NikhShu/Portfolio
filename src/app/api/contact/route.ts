import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const body: Record<string, unknown> = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // Validate required fields
    const errors: string[] = [];
    if (name.length < 2) {
      errors.push("Name must be at least 2 characters");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Valid email is required");
    }
    if (subject.length < 2) {
      errors.push("Subject must be at least 2 characters");
    }
    if (message.length < 10) {
      errors.push("Message must be at least 10 characters");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const recipientEmail =
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nikshukla26@gmail.com";

    const senderAddress =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const resend = getResend();

    await resend.emails.send({
      from: `Portfolio Contact <${senderAddress}>`,
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `New message from your portfolio contact form:`,
        ``,
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        message,
        ``,
        `---`,
        `Sent via nikhil-shukla.vercel.app`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        errors: [
          "Failed to send your message. Please try again later.",
        ],
      },
      { status: 500 }
    );
  }
}
