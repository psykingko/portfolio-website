# Email Service Setup Guide

Simple setup guide for the portfolio contact form using Resend.

## Quick Setup (5 minutes)

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address

### 2. Get API Key

1. Go to "API Keys" in your Resend dashboard
2. Click "Create API Key"
3. Copy the generated key (starts with `re_`)

### 3. Configure Environment

Update your `.env.local` file:

```bash
# Your Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# Email where contact form messages will be sent
# IMPORTANT: Must be the same email you used for Resend account
CONTACT_EMAIL=your-resend-account-email@gmail.com
```

### 4. For Vercel Deployment

1. In your Vercel project settings, add the same environment variables
2. Update `NEXT_PUBLIC_SITE_URL` to your Vercel domain

## Important Notes

- **Email Limitation**: Without domain verification, you can only receive emails at the same address you used to create your Resend account
- **Free Tier**: 3,000 emails/month, 100 emails/day - perfect for portfolios
- **Spam Protection**: Built-in honeypot, rate limiting, and keyword filtering

## That's it!

Your contact form will work immediately. No domain setup required for basic functionality.

## Spam Protection Features

The implementation includes multiple layers of spam protection:

### 1. Honeypot Field

- Hidden `website` field that legitimate users won't fill
- If filled, the submission is silently discarded

### 2. Keyword Filtering

- Detects common spam keywords (viagra, casino, lottery, etc.)
- Configurable list in the API route

### 3. Pattern Analysis

- Detects excessive links (>3 URLs)
- Identifies repeated character patterns
- Flags suspicious content structure

### 4. Rate Limiting

- Maximum 5 requests per IP per 15 minutes
- Prevents spam attacks and abuse

### 5. Input Validation

- Strict validation using Zod schema
- Prevents malicious input and XSS attacks

## API Endpoint

### POST `/api/contact`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here..."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon."
}
```

**Error Responses:**

**Validation Error (400):**

```json
{
  "error": "Invalid form data",
  "details": [
    {
      "path": ["email"],
      "message": "Please enter a valid email address"
    }
  ]
}
```

**Rate Limit Error (429):**

```json
{
  "error": "Too many requests. Please try again later."
}
```

**Server Error (500):**

```json
{
  "error": "Failed to send message. Please try again later."
}
```

## Usage in Components

Use the provided `useContactForm` hook:

```typescript
import { useContactForm } from "@/hooks/useContactForm";

function ContactForm() {
  const { isSubmitting, isSuccess, error, submitForm, resetForm } =
    useContactForm();

  const handleSubmit = async (data: ContactFormData) => {
    await submitForm(data);
  };

  // ... rest of component
}
```

## Testing

Run the test suite to verify everything works:

```bash
# Run API tests
npm test -- src/__tests__/api/contact.test.ts

# Run hook tests
npm test -- src/__tests__/hooks/useContactForm.test.ts
```

## Monitoring and Debugging

### Logs

- Check Vercel function logs for errors
- Monitor Resend dashboard for delivery status

### Common Issues

1. **API Key not working**: Ensure the key is correctly set in environment variables
2. **Emails not delivered**: Check spam folder, verify domain setup
3. **Rate limiting**: Implement proper user feedback for rate limits

### Production Considerations

1. **Domain Verification**: Set up custom domain for better deliverability
2. **Monitoring**: Set up alerts for failed email deliveries
3. **Backup Service**: Consider a fallback email service for redundancy
4. **Analytics**: Track form submission success rates

## Alternative Email Services

If you prefer a different service, the API can be easily modified to use:

- **SendGrid**: Popular choice with good free tier
- **Mailgun**: Reliable with pay-as-you-go pricing
- **Amazon SES**: Cost-effective for high volume
- **Formspree**: Simple form handling service

## Security Best Practices

1. **Environment Variables**: Never commit API keys to version control
2. **CORS**: Configure appropriate CORS headers for production
3. **Input Sanitization**: All inputs are validated and sanitized
4. **Rate Limiting**: Implement proper rate limiting to prevent abuse
5. **Logging**: Log suspicious activity for monitoring

## Support

For issues with:

- **Resend**: Check their [documentation](https://resend.com/docs) or support
- **Implementation**: Review the test files for expected behavior
- **Deployment**: Check Vercel function logs and environment variables
