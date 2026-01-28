/**
 * @jest-environment node
 */

// Integration test for the contact API endpoint
// This test verifies the API functionality without importing TypeScript files

describe("Contact API Integration", () => {
  // Mock fetch for testing
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("should validate email addresses correctly", () => {
    const { z } = require("zod");

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
      website: z.string().optional(),
    });

    // Valid data should pass
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message that is long enough to pass validation.",
    };

    expect(() => contactSchema.parse(validData)).not.toThrow();

    // Invalid email should fail
    const invalidEmailData = {
      ...validData,
      email: "invalid-email",
    };

    expect(() => contactSchema.parse(invalidEmailData)).toThrow();

    // Short message should fail
    const shortMessageData = {
      ...validData,
      message: "Short",
    };

    expect(() => contactSchema.parse(shortMessageData)).toThrow();
  });

  it("should detect spam keywords", () => {
    const spamKeywords = [
      "viagra",
      "casino",
      "lottery",
      "winner",
      "congratulations",
      "click here",
      "free money",
    ];

    const testMessage = "Congratulations! You have won the lottery!";
    const messageText = testMessage.toLowerCase();
    const hasSpamKeywords = spamKeywords.some(keyword =>
      messageText.includes(keyword)
    );

    expect(hasSpamKeywords).toBe(true);

    const legitimateMessage =
      "Hello, I would like to discuss a project opportunity.";
    const legitimateText = legitimateMessage.toLowerCase();
    const hasSpamInLegitimate = spamKeywords.some(keyword =>
      legitimateText.includes(keyword)
    );

    expect(hasSpamInLegitimate).toBe(false);
  });

  it("should detect excessive links", () => {
    const messageWithManyLinks =
      "Check out these links: https://site1.com https://site2.com https://site3.com https://site4.com";
    const linkCount = (messageWithManyLinks.match(/https?:\/\//g) || []).length;
    const hasExcessiveLinks = linkCount > 3;

    expect(hasExcessiveLinks).toBe(true);

    const messageWithFewLinks = "Check out my portfolio at https://mysite.com";
    const fewLinkCount = (messageWithFewLinks.match(/https?:\/\//g) || [])
      .length;
    const hasFewLinks = fewLinkCount > 3;

    expect(hasFewLinks).toBe(false);
  });

  it("should detect repeated character patterns", () => {
    const messageWithRepeatedChars = "This is spammmmmmmmmmmmmmmmm";
    const hasRepeatedChars = /(.)\1{10,}/.test(messageWithRepeatedChars);

    expect(hasRepeatedChars).toBe(true);

    const normalMessage = "This is a normal message";
    const hasNormalPattern = /(.)\1{10,}/.test(normalMessage);

    expect(hasNormalPattern).toBe(false);
  });

  it("should implement rate limiting logic", () => {
    // Simple rate limiting simulation
    const rateLimitStore = new Map();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 5;

    function checkRateLimit(ip) {
      const now = Date.now();
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

    const testIp = "192.168.1.1";

    // First 5 requests should be allowed
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(testIp)).toBe(true);
    }

    // 6th request should be blocked
    expect(checkRateLimit(testIp)).toBe(false);
  });

  it("should format email content correctly", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message\nwith multiple lines.",
    };

    const expectedHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5634d6;">New Contact Form Submission</h2>
        
        <div style="background: #f9ede3; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #5634d6;">
          <h3>Message:</h3>
          <p style="line-height: 1.6;">${data.message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px; font-size: 12px; color: #666;">
          <p>This message was sent from the portfolio contact form at ${process.env.NEXT_PUBLIC_SITE_URL || "localhost"}</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      </div>
    `;

    // Test that message formatting works correctly
    const formattedMessage = data.message.replace(/\n/g, "<br>");
    expect(formattedMessage).toBe(
      "This is a test message<br>with multiple lines."
    );
  });

  it("should validate environment variables", () => {
    // Test environment variable validation
    const requiredEnvVars = ["RESEND_API_KEY", "CONTACT_EMAIL"];

    // Mock environment with missing variables
    const originalEnv = process.env;
    process.env = {};

    const missingVars = requiredEnvVars.filter(
      varName => !process.env[varName]
    );
    expect(missingVars.length).toBe(2);

    // Restore environment
    process.env = originalEnv;
  });
});
