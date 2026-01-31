import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Contact form validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message too long"),
  // Honeypot field for spam protection
  website: z.string().optional(),
});

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per 15 minutes

  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Email sending function using Resend (free tier)
async function sendEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured");
    throw new Error("Email service not configured");
  }

  const emailPayload = {
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [process.env.CONTACT_EMAIL || "psykingko@gmail.com"],
    subject: `Portfolio Contact: Message from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1b2651;">New Contact Form Submission</h2>
        
        <div style="background: #edeae1; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1b2651;">
          <h3>Message:</h3>
          <p style="line-height: 1.6;">${data.message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px; font-size: 12px; color: #666;">
          <p>This message was sent from the portfolio contact form at ${process.env.NEXT_PUBLIC_SITE_URL}</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This message was sent from the portfolio contact form at ${process.env.NEXT_PUBLIC_SITE_URL}
Timestamp: ${new Date().toISOString()}
    `,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Resend API error:", error);
    throw new Error("Failed to send email");
  }

  return await response.json();
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Honeypot spam protection - if website field is filled, it's likely spam
    if (validatedData.website && validatedData.website.trim() !== "") {
      console.log("Spam detected via honeypot field");
      // Return success to not reveal the honeypot
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    }

    // Additional spam checks
    const spamKeywords = [
      "viagra",
      "casino",
      "lottery",
      "winner",
      "congratulations",
      "click here",
      "free money",
    ];
    const messageText = validatedData.message.toLowerCase();
    const hasSpamKeywords = spamKeywords.some(keyword =>
      messageText.includes(keyword)
    );

    if (hasSpamKeywords) {
      console.log("Spam detected via keyword filtering");
      // Return success to not reveal the spam detection
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    }

    // Check for suspicious patterns (excessive links, repeated characters)
    const linkCount = (validatedData.message.match(/https?:\/\//g) || [])
      .length;
    const hasExcessiveLinks = linkCount > 3;
    const hasRepeatedChars = /(.)\1{10,}/.test(validatedData.message);

    if (hasExcessiveLinks || hasRepeatedChars) {
      console.log("Spam detected via pattern analysis");
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    }

    // Send email
    await sendEmail({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_SITE_URL || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
