import { NextResponse } from "next/server";
import { contactController } from "@/lib/controllers/contactController";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const subject = searchParams.get('subject');
    const message = searchParams.get('message');

    if (!token || !email || !name || !message) {
      return NextResponse.json({ success: false, error: "Missing verification parameters" }, { status: 400 });
    }

    // Create a mock request object with the token
    const mockReq = {
      json: async () => ({
        name,
        email,
        subject,
        message,
        token
      })
    };

    // Call the contact controller to process the verification
    const result = await contactController.sendContact(mockReq);
    const resultData = await result.json();

    if (result.status === 200 && resultData.success) {
      // Redirect to a success page or show success message
      const successHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Email Verified - Message Sent</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .success { color: #28a745; font-size: 48px; margin-bottom: 20px; }
            h1 { color: #333; margin-bottom: 20px; }
            p { color: #666; line-height: 1.6; }
            .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✓</div>
            <h1>Email Verified Successfully!</h1>
            <p>Your message has been sent. Thank you for contacting us!</p>
            <a href="/" class="button">Return to Portfolio</a>
          </div>
        </body>
        </html>
      `;

      return new Response(successHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });
    } else {
      // Show error page
      const errorHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Verification Failed</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .error { color: #dc3545; font-size: 48px; margin-bottom: 20px; }
            h1 { color: #333; margin-bottom: 20px; }
            p { color: #666; line-height: 1.6; }
            .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error">✗</div>
            <h1>Verification Failed</h1>
            <p>The verification link is invalid or has expired. Please try sending your message again.</p>
            <a href="/" class="button">Return to Portfolio</a>
          </div>
        </body>
        </html>
      `;

      return new Response(errorHtml, {
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      });
    }
  } catch (error) {
    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .error { color: #dc3545; font-size: 48px; margin-bottom: 20px; }
          h1 { color: #333; margin-bottom: 20px; }
          p { color: #666; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error">⚠</div>
          <h1>An Error Occurred</h1>
          <p>Please try again later or contact support if the problem persists.</p>
        </div>
      </body>
      </html>
    `;

    return new Response(errorHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html' }
    });
  }
};
