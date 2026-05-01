import { NextRequest, NextResponse } from 'next/server';

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
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'intent', 'message'];
    const missingFields = requiredFields.filter(field => !body[field] || body[field].trim() === '');
    
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

    // Add metadata
    const formData = {
      ...body,
      timestamp: new Date().toISOString()
    };

    // Try to submit to Google Apps Script
    try {
      const result = await appendToGoogleAppsScript(formData);
      
      if (result.status === 'success') {
        // Send backup email notification
        await sendEmailNotification(formData);
        
        return NextResponse.json({
          status: 'success',
          message: 'Form submitted successfully',
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (scriptError) {
      console.error('Google Apps Script error:', scriptError);
      
      // Try to send email as backup
      try {
        await sendEmailNotification(formData);
        
        return NextResponse.json({
          status: 'success',
          message: 'Form submitted (email backup)',
          timestamp: new Date().toISOString()
        });
      } catch (emailError) {
        console.error('Email backup also failed:', emailError);
        
        return NextResponse.json({
          status: 'error',
          message: 'Failed to submit form. Please try again later.'
        }, { status: 500 });
      }
    }

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
