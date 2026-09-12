import { NextRequest, NextResponse } from 'next/server';

// List of non-company / personal email domains to block
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'yahoo.com',
  'ymail.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'proton.me',
  'aol.com',
  'gmx.com',
  'gmx.net',
  'zoho.com',
  'mail.com',
  'yandex.com',
  'rediffmail.com'
];

// Helper to validate company email
function isCompanyEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@').pop()?.toLowerCase().trim();
  if (!domain) return false;
  return !PERSONAL_EMAIL_DOMAINS.includes(domain);
}

// Helper to validate LinkedIn URL format
function isValidLinkedInUrl(url: string): boolean {
  if (!url) return false;
  const cleanUrl = url.trim().toLowerCase();
  const pattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+\/?.*$/;
  return pattern.test(cleanUrl);
}

// Function to append data to Google Sheets via Apps Script
async function sendToGoogleAppsScript(data: Record<string, any>) {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

  if (!scriptUrl) {
    console.warn('NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL is not configured in environment variables.');
    return { status: 'success', note: 'Apps Script URL not configured' };
  }

  const response = await fetch(scriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Google Apps Script API error: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, designation, linkedin } = body;

    // 1. Check required fields
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim() || !designation?.trim() || !linkedin?.trim()) {
      return NextResponse.json(
        { status: 'error', message: 'All fields (First Name, Last Name, Phone, Email, Designation, LinkedIn) are required.' },
        { status: 400 }
      );
    }

    // 2. Validate Email format and restriction to company email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { status: 'error', message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!isCompanyEmail(email.trim())) {
      return NextResponse.json(
        { status: 'error', message: 'Please provide a valid company email address. Personal email domains (Gmail, Outlook, Yahoo, etc.) are not accepted.' },
        { status: 400 }
      );
    }

    // 3. Validate LinkedIn Profile URL
    if (!isValidLinkedInUrl(linkedin.trim())) {
      return NextResponse.json(
        { status: 'error', message: 'Please provide a valid LinkedIn profile link (e.g., https://linkedin.com/in/yourname).' },
        { status: 400 }
      );
    }

    // 4. Construct payload for Google Sheets / Apps Script
    const payload = {
      category: 'BPL Community Signup',
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      designation: designation.trim(),
      linkedin: linkedin.trim(),
      timestamp: new Date().toISOString()
    };

    // Forward payload to Google Apps Script endpoint
    let apiResult = null;
    try {
      apiResult = await sendToGoogleAppsScript(payload);
    } catch (scriptErr: any) {
      console.error('Error forwarding to Google Apps Script:', scriptErr);
      // Still accept form submission gracefully if Apps Script fails temporarily
    }

    return NextResponse.json({
      status: 'success',
      message: 'Signup confirmed! Welcome to the BlueTeam Premier League.',
      data: payload,
      scriptResult: apiResult
    });

  } catch (err: any) {
    console.error('Community signup API route error:', err);
    return NextResponse.json(
      { status: 'error', message: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
