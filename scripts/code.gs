// Google Apps Script for Trench Connect, MSSP, Job Applications, & BPL Community Signups

// --- CONFIGURATION ---
const CONFIG = {
  RECIPIENT_EMAIL: 'ask@trenchsecurity.ai', 
  FROM_ALIAS: 'ask@trenchsecurity.ai', // ⚠️ Must be verified under Gmail Settings -> Accounts -> Send mail as
  SHEET_NAME: 'Form Submissions',
  JOB_SHEET_NAME: 'Job Applications',
  BPL_SHEET_NAME: 'BPL Submissions', // Dedicated tab for BPL signups
  BRAND_NAME: 'Trench Security',
  BRAND_LOGO_URL: 'https://raw.githubusercontent.com/chandrasekar-velu23/trench-home/refs/heads/main/public/logo/trench-logo.png',
  BPL_LOGO_URL: 'https://raw.githubusercontent.com/chandrasekar-velu23/trench-home/refs/heads/main/public/BPL/BPL%20LOGO.png',
  LUMA_CALENDAR_URL: 'https://luma.com/calendar/cal-FwLKyNupiOO86Mg?period=past',
  DRIVE_FOLDER_NAME: 'Trench Job Applications'
};

// Main function to handle form submissions via POST request
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse('error', 'Invalid request body format');
    }

    const data = JSON.parse(e.postData.contents);
    
    // =========================================================
    // ROUTE 1: BPL COMMUNITY SIGNUPS
    // =========================================================
    if (data.category === 'BPL Community Signup' || data.formType === 'bpl_signup') {
      return handleBplSignup(data);
    }
    
    // =========================================================
    // ROUTE 2: JOB APPLICATIONS
    // =========================================================
    if (data.formType === 'job_application') {
      return handleJobApplication(data);
    }
    
    // =========================================================
    // ROUTE 3: TRENCH CONNECT / MSSP FORMS (Original Logic)
    // =========================================================
    
    let userEmail = data.email ? String(data.email).trim() : '';
    
    if (!userEmail || userEmail.toLowerCase() === 'your-email@example.com') {
      Logger.log('Blocked placeholder email submission: ' + userEmail);
      return createResponse('error', 'A valid dynamic email address is required.');
    }

    let fullName = '';
    let firstName = '';
    let lastName = '';
    
    if (data.fullName && String(data.fullName).trim() !== '') {
      fullName = String(data.fullName).trim();
      const parts = fullName.split(/\s+/);
      firstName = data.firstName || parts[0] || 'User';
      lastName = data.lastName || parts.slice(1).join(' ') || '';
    } else {
      firstName = String(data.firstName || 'User').trim();
      lastName = String(data.lastName || '').trim();
      fullName = (firstName + ' ' + lastName).trim();
    }
    
    const company = data.company || data.companyName || 'Not provided';
    const teamSize = data.teamSize || 'Not provided';
    const intent = data.intent || 'Not provided';
    const message = data.message || '';
    const category = data.category || (data.companyName ? 'MSSP' : 'Connect');
    
    const standardizedData = {
      ...data,
      email: userEmail,
      contactNumber: data.contactNumber || 'Not provided',
      firstName,
      lastName,
      fullName,
      company,
      teamSize,
      intent,
      message,
      category
    };

    // 1. Write submission row data to Google Sheet
    const sheet = getOrCreateSheet();
    appendToSheet(sheet, standardizedData);

    // 2. Trigger instant email communication pipelines
    try {
      sendAdminEmail(standardizedData);
    } catch (adminMailErr) {
      Logger.log('Error sending admin alert: ' + adminMailErr.toString());
    }
    
    try {
      sendReceiverEmail(standardizedData);
    } catch (recvMailErr) {
      Logger.log('Error sending user email: ' + recvMailErr.toString());
    }

    return createResponse('success', 'Form processed successfully');

  } catch (error) {
    Logger.log('Critical error in doPost: ' + error.toString());
    return createResponse('error', 'Internal server error occurred: ' + error.toString());
  }
}

// =========================================================
// HANDLER: BPL COMMUNITY SIGNUP LOGIC
// =========================================================
function handleBplSignup(data) {
  try {
    const firstName = String(data.firstName || 'Security Leader').trim();
    const lastName = String(data.lastName || '').trim();
    const fullName = `${firstName} ${lastName}`.trim();
    const email = String(data.email || '').trim();
    const phone = String(data.phone || data.contactNumber || 'Not provided').trim();
    const designation = String(data.designation || 'Not provided').trim();
    const linkedin = String(data.linkedin || 'Not provided').trim();
    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();

    if (!email) {
      return createResponse('error', 'Email is required for BPL signup.');
    }

    // 1. Get or create 'BPL Submissions' tab
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.BPL_SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.BPL_SHEET_NAME);
      const headers = [
        "Timestamp", 
        "First Name", 
        "Last Name", 
        "Work Email", 
        "Phone Number", 
        "Current Designation", 
        "LinkedIn Profile", 
        "Category"
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0D41E1');
      headerRange.setFontColor('#FFFFFF');
      sheet.autoResizeColumns(1, headers.length);
    }

    // 2. Append the row
    const rowData = [
      timestamp,
      firstName,
      lastName,
      email,
      phone,
      designation,
      linkedin,
      data.category || 'BPL Community Signup'
    ];

    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);

    // Style row
    const dataRange = sheet.getRange(nextRow, 1, 1, rowData.length);
    dataRange.setVerticalAlignment('middle');
    if (nextRow % 2 === 0) {
      dataRange.setBackground('#F8F9FA');
    }
    sheet.autoResizeColumns(1, rowData.length);

    // 3. Send Admin Alert Email
    try {
      sendBplAdminEmail({ firstName, lastName, fullName, email, phone, designation, linkedin, timestamp });
    } catch (err) {
      Logger.log('Error sending BPL admin email: ' + err.toString());
    }

    // 4. Send Welcome Confirmation Email to Applicant with BPL Logo & Luma Calendar Link
    try {
      sendBplWelcomeEmail({ firstName, email, designation });
    } catch (err) {
      Logger.log('Error sending BPL welcome email: ' + err.toString());
    }

    return createResponse('success', 'BPL Community Signup recorded successfully');
  } catch (error) {
    Logger.log('Error in handleBplSignup: ' + error.toString());
    return createResponse('error', 'Failed to process BPL signup: ' + error.toString());
  }
}

// BPL Admin Notification Email
function sendBplAdminEmail(data) {
  const subject = `New BPL Community Signup - ${data.fullName} (${data.designation})`;
  
  const htmlBody = `
    <div style="font-family: sans-serif; font-size: 14px; color: #333; max-width: 580px; border: 1px solid #ddd; border-radius: 12px; padding: 24px; background: #ffffff;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid #0D41E1; padding-bottom: 12px;">
        <img src="${CONFIG.BPL_LOGO_URL}" alt="BPL Logo" style="max-height: 45px; display: block;" />
        <h2 style="color: #0D41E1; margin: 0; font-size: 20px;">New BPL Member Registration</h2>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; width: 38%;">Full Name:</td><td style="padding: 10px 0;">${data.fullName}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Work Email:</td><td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #0D41E1;">${data.email}</a></td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Phone Number:</td><td style="padding: 10px 0;">${data.phone}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Current Designation:</td><td style="padding: 10px 0;">${data.designation}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">LinkedIn Profile:</td><td style="padding: 10px 0;"><a href="${data.linkedin}" target="_blank" style="color: #0D41E1;">${data.linkedin}</a></td></tr>
      </table>
      <p style="font-size: 11px; color: #888; margin-top: 24px;">Submitted at: ${new Date(data.timestamp).toLocaleString()}</p>
    </div>
  `;

  GmailApp.sendEmail(CONFIG.RECIPIENT_EMAIL, subject, '', {
    from: CONFIG.FROM_ALIAS,
    name: CONFIG.BRAND_NAME,
    replyTo: CONFIG.FROM_ALIAS,
    htmlBody: htmlBody
  });
}

// BPL Welcome Confirmation Email (Sent to Applicant)
function sendBplWelcomeEmail(data) {
  const subject = `Welcome to BlueTeam Premier League (BPL)`;
  
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1E293B; max-width: 600px; margin: 0 auto; border: 1px solid rgba(13, 65, 225, 0.15); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); background: #ffffff;">
      
      <!-- BPL Banner Header -->
      <div style="background: linear-gradient(135deg, #0D41E1 0%, #1E3EB0 100%); padding: 32px 24px; text-align: center;">
        <img src="${CONFIG.BPL_LOGO_URL}" alt="BlueTeam Premier League Logo" style="max-height: 90px; width: auto; margin-bottom: 12px; display: inline-block;" />
        <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.02em;">BlueTeam Premier League</h1>
        <p style="color: #34E1FF; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 6px 0 0;">Play Between The Lines</p>
      </div>

      <!-- Main Email Content -->
      <div style="padding: 32px 28px;">
        <p style="font-size: 16px; font-weight: 700; color: #0F172A; margin-top: 0;">Hi ${data.firstName || 'Security Leader'},</p>
        
        <p style="color: #475569; font-size: 15px; line-height: 1.6;">
          Welcome to the <strong>BlueTeam Premier League (BPL)</strong> community! Your signup has been officially confirmed.
        </p>

        <p style="color: #475569; font-size: 15px; line-height: 1.6;">
          BPL is an exclusive cybersecurity gathering inspired by premier sports leagues. It is designed for CISOs, SOC leads, and security practitioners to connect, exchange real-world incident blueprints, and engage in friendly after-hours competition.
        </p>

        <!-- CTA Box for Luma Calendar -->
        <div style="background: rgba(13, 65, 225, 0.04); border: 1px solid rgba(13, 65, 225, 0.15); border-radius: 14px; padding: 24px; margin: 28px 0; text-align: center;">
          <h3 style="margin: 0 0 8px; font-size: 17px; color: #0D41E1; font-weight: 800;">Stay Tuned for Upcoming BPL Meetups</h3>
          <p style="margin: 0 0 18px; font-size: 14px; color: #64748B;">Subscribe to our official Luma calendar to get automatic invitations to live match days, SOC workshops, and networking mixers.</p>
          <a href="${CONFIG.LUMA_CALENDAR_URL}" target="_blank" style="display: inline-block; background: #0D41E1; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 10px; box-shadow: 0 4px 14px rgba(13, 65, 225, 0.3);">
            Follow BPL Calendar on Luma &rarr;
          </a>
        </div>

        <p style="color: #475569; font-size: 14px; margin-bottom: 24px;">
          If you have any questions or would like to participate as a speaker or team captain, reply directly to this email or reach us at <a href="mailto:ask@trenchsecurity.ai" style="color: #0D41E1; font-weight: 600; text-decoration: none;">ask@trenchsecurity.ai</a>.
        </p>

        <!-- Footer Signoff -->
        <div style="border-top: 1px solid #E2E8F0; margin-top: 28px; padding-top: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <img src="${CONFIG.BRAND_LOGO_URL}" alt="Trench Security Logo" style="max-height: 24px; display: block;" />
          </div>
          <p style="margin: 0; font-size: 13px; color: #64748B; line-height: 1.5;">
            <strong>Team Trench Security</strong><br />
            <a href="https://www.trenchsecurity.ai" style="color: #0D41E1; text-decoration: none; font-weight: 500;">www.trenchsecurity.ai</a>
          </p>
        </div>
      </div>
    </div>
  `;

  GmailApp.sendEmail(data.email, subject, '', {
    from: CONFIG.FROM_ALIAS,
    name: `${CONFIG.BRAND_NAME} - BPL Community`,
    replyTo: CONFIG.FROM_ALIAS,
    htmlBody: htmlBody
  });
}

// =========================================================
// HANDLER: JOB APPLICATIONS LOGIC
// =========================================================
function handleJobApplication(data) {
  try {
    const { firstName, lastName, email, phone, jobRole, resumeBase64, resumeMimeType, resumeName } = data;
      
    const folderIterator = DriveApp.getFoldersByName(CONFIG.DRIVE_FOLDER_NAME);
    const folder = folderIterator.hasNext() ? folderIterator.next() : DriveApp.createFolder(CONFIG.DRIVE_FOLDER_NAME);
    
    let fileUrl = "No file uploaded";
    if (resumeBase64) {
      const decodedFile = Utilities.base64Decode(resumeBase64);
      const blob = Utilities.newBlob(decodedFile, resumeMimeType, resumeName);
      const file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.JOB_SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.JOB_SHEET_NAME);
      const headers = ["Timestamp", "First Name", "Last Name", "Email", "Phone", "Job Role", "Resume URL"];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0D41E1');
      headerRange.setFontColor('#FFFFFF');
      sheet.autoResizeColumns(1, headers.length);
    }
    
    const rowData = [new Date(), firstName, lastName, email, phone, jobRole, fileUrl];
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    const dataRange = sheet.getRange(nextRow, 1, 1, rowData.length);
    dataRange.setVerticalAlignment('middle');
    if (nextRow % 2 === 0) {
      dataRange.setBackground('#F8F9FA');
    }
    sheet.autoResizeColumns(1, rowData.length);
    
    return createResponse('success', 'Application received');
  } catch (error) {
    Logger.log('Critical error in handleJobApplication: ' + error.toString());
    return createResponse('error', 'Error saving application: ' + error.toString());
  }
}

// =========================================================
// HELPER FUNCTIONS
// =========================================================

function createResponse(status, message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: status,
    message: message,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    const headers = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Email',
      'Contact Number',
      'Company',
      'Team Size',
      'Intent',
      'Message',
      'Category'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#0D41E1');
    headerRange.setFontColor('#FFFFFF');
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function appendToSheet(sheet, data) {
  const timestamp = new Date();
  
  const rowData = [
    timestamp,
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    data.contactNumber || '',
    data.company || '',
    data.teamSize || '',
    data.intent || '',
    data.message || '',
    data.category || 'Connect'
  ];
  
  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
  
  const dataRange = sheet.getRange(nextRow, 1, 1, rowData.length);
  dataRange.setVerticalAlignment('middle');
  if (nextRow % 2 === 0) {
    dataRange.setBackground('#F8F9FA');
  }
  sheet.autoResizeColumns(1, rowData.length);
}

function sendAdminEmail(data) {
  const subject = `New ${data.category} Submission - ${data.fullName}`;
  
  const htmlBody = `
    <div style="font-family: sans-serif; font-size: 14px; color: #333; max-width: 550px; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
      <h2 style="color: #0D41E1; margin-top: 0;">New Lead Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; font-weight: bold; width: 35%;">Category:</td><td style="padding: 8px 0;">${data.category}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; font-weight: bold;">Full Name:</td><td style="padding: 8px 0;">${data.fullName}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; font-weight: bold;">Contact Number:</td><td style="padding: 8px 0;">${data.contactNumber}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; font-weight: bold;">Team Size:</td><td style="padding: 8px 0;">${data.teamSize}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; font-weight: bold;">Intent:</td><td style="padding: 8px 0;">${data.intent}</td></tr>
      </table>
      ${data.message ? `<p style="margin-top: 15px; padding: 10px; background: #f9f9f9; border-left: 3px solid #0D41E1;"><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>` : ''}
      <p style="font-size: 11px; color: #999; margin-top: 20px;">Submitted at: ${new Date().toLocaleString()}</p>
    </div>
  `;

  GmailApp.sendEmail(CONFIG.RECIPIENT_EMAIL, subject, '', {
    from: CONFIG.FROM_ALIAS,
    name: CONFIG.BRAND_NAME,
    replyTo: CONFIG.FROM_ALIAS,
    htmlBody: htmlBody
  });
}

function sendReceiverEmail(data) {
  const isMSSP = data.category === 'MSSP';
  const subject = isMSSP 
    ? `Welcome to the Trench Partnership Engine`
    : `You are in. Welcome to the Trench.`;
    
  const bodyTextConnect = `Thank you for reaching out. Your request has landed with the right people.<br>Someone from the Trench team will be in touch within one business day to set up your session.`;
  const bodyTextMSSP = `Thank you for your interest in partnering with Trench. Our partner relations team has received your application.<br>We will review your firm's details and reach out within one business day to discuss partnerships and delivering Headless SecOps to your clients.`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827; max-width: 600px;">
      
      <p>Hi ${data.firstName || 'there'},</p>
      
      <p>${isMSSP ? bodyTextMSSP : bodyTextConnect}</p>
      
      <p>If you need to reach us before then, write to us at <a href="mailto:ask@trenchsecurity.ai" style="color: #0D41E1; text-decoration: none; font-weight: 500;">ask@trenchsecurity.ai</a></p>
      
      <p style="margin-top: 24px; font-style: italic; color: #374151;">Every castle needs a Trench. Yours is on its way.</p>
      
      <div>
        <img src="${CONFIG.BRAND_LOGO_URL}" alt="${CONFIG.BRAND_NAME}" style="max-height: 26px; display: block;" onerror="this.style.display='none';">
      </div>
      <p style="margin-top: 24px; line-height: 1.4; margin-bottom: 20px;">
        Team Trench,<br>
        <a href="https://www.trenchsecurity.ai" style="color: #0D41E1; text-decoration: none; font-weight: 500;">www.trenchsecurity.ai</a>
      </p>
    </div>
  `;

  GmailApp.sendEmail(data.email, subject, '', {
    from: CONFIG.FROM_ALIAS,
    name: CONFIG.BRAND_NAME,
    replyTo: CONFIG.FROM_ALIAS,
    htmlBody: htmlBody
  });
}

// =========================================================
// TEST FUNCTIONS FOR DIRECT TESTING IN GOOGLE APPS SCRIPT
// =========================================================

/**
 * TEST 1: Test sending BPL Welcome Email to your personal/work email.
 * Select 'testBplWelcomeEmail' in Google Apps Script editor and click 'Run'.
 */
function testBplWelcomeEmail() {
  const TEST_EMAIL = 'chandrasekar.v2304@gmail.com'; // 👈 Replace with your email address to test
  Logger.log('Sending test BPL Welcome email to: ' + TEST_EMAIL);
  
  sendBplWelcomeEmail({
    firstName: 'Chandra',
    email: TEST_EMAIL,
    designation: 'CISO / Security Director'
  });
  
  Logger.log('✅ BPL Welcome email sent successfully!');
}

/**
 * TEST 2: Test sending BPL Admin Triage Notification Email.
 * Select 'testBplAdminEmail' in Google Apps Script editor and click 'Run'.
 */
function testBplAdminEmail() {
  Logger.log('Sending test BPL Admin email to: ' + CONFIG.RECIPIENT_EMAIL);
  
  sendBplAdminEmail({
    firstName: 'Chandra',
    lastName: 'Velu',
    fullName: 'Chandra Velu',
    email: 'chandra@acmesecurity.io',
    phone: '+1 (555) 234-5678',
    designation: 'Lead SOC Analyst',
    linkedin: 'https://linkedin.com/in/chandrasekar-velu',
    timestamp: new Date().toISOString()
  });
  
  Logger.log('✅ BPL Admin email sent successfully!');
}

/**
 * TEST 3: Test full end-to-end BPL submission (updates Spreadsheet & sends both emails).
 * Select 'testBplFullSubmission' in Google Apps Script editor and click 'Run'.
 */
function testBplFullSubmission() {
  const TEST_EMAIL = 'chandrasekar.v2304@gmail.com'; // 👈 Replace with your email address to test
  
  const mockPayload = {
    category: 'BPL Community Signup',
    firstName: 'Chandra',
    lastName: 'Velu',
    email: TEST_EMAIL,
    phone: '+1 (555) 987-6543',
    designation: 'Head of Cyber Defense',
    linkedin: 'https://linkedin.com/in/chandrasekar-velu',
    timestamp: new Date().toISOString()
  };
  
  Logger.log('Testing full BPL submission for: ' + TEST_EMAIL);
  const result = handleBplSignup(mockPayload);
  Logger.log('Result: ' + result.getContent());
}
