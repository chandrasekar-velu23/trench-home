import { NextRequest, NextResponse, after } from 'next/server';

// Google Sheets API configuration
const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const SHEET_NAME = 'Form Submissions';
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

// Function to get Google Sheets access token
async function getGoogleSheetsToken() {
  // For production, you'll need to set up OAuth2 or service account
  // For now, we'll use a simple approach with Apps Script as proxy
  return null;
}

// Function to append data to Google Sheets via Apps Script
async function appendToGoogleAppsScript(data: any) {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
  
  if (!scriptUrl) {
    throw new Error('Google Apps Script URL not configured');
  }

  const response = await fetch(scriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Google Apps Script error: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

// Function to send email notification (backup)
async function sendEmailNotification(data: any) {
  // This is a placeholder - you can integrate with any email service
  // For now, we'll just log it
  console.log('Email notification would be sent to:', ADMIN_EMAIL);
  console.log('Form data:', data);
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Determine category based on context (MSSP if companyName is present, Connect otherwise)
    const category = body.companyName ? 'MSSP' : 'Connect';
    
    // Validate required fields depending on the form category
    const requiredFields = category === 'MSSP' 
      ? ['fullName', 'email', 'companyName'] 
      : ['fullName', 'email', 'teamSize', 'intent'];
      
    const missingFields = requiredFields.filter(field => !body[field] || String(body[field]).trim() === '');
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({
        status: 'error',
        message: 'Invalid email format'
      }, { status: 400 });
    }

    // Extract first and last name parts for spreadsheet compatibility
    const nameParts = (body.fullName || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Standardize variables to match target spreadsheet columns
    const formData = {
      category,
      firstName,
      lastName,
      fullName: body.fullName,
      email: body.email,
      company: body.companyName || body.company || '',
      teamSize: body.teamSize || 'MSSP Partner',
      intent: body.intent || 'MSSP Partnership',
      message: body.message || '',
      timestamp: new Date().toISOString()
    };

    // Forward to the combined Google Apps Script Webhook in the background
    after(async () => {
      try {
        const result = await appendToGoogleAppsScript(formData);
        
        if (result.status === 'success') {
          // Log backup verification
          await sendEmailNotification(formData);
        } else {
          console.warn('Google Apps Script submission returned non-success:', result.message);
          await sendEmailNotification(formData);
        }
      } catch (scriptError) {
        console.error('Google Apps Script background error:', scriptError);
        
        // Secondary fallback (e.g. backup local email triggers)
        try {
          await sendEmailNotification(formData);
        } catch (emailError) {
          console.error('API backup background failure:', emailError);
        }
      }
    });

    return NextResponse.json({
      status: 'success',
      message: 'Form submitted successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API route error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'error',
    message: 'Method not allowed'
  }, { status: 405 });
}
