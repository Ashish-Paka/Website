exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse JSON body
    const data = JSON.parse(event.body);
    const { name, email, subject, message } = data;
    const timestamp = new Date().toISOString();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields',
          message: 'Please fill in all required fields'
        })
      };
    }

    // Prepare CSV data with proper escaping
    const escapeCsvField = (field) => {
      const str = String(field || '');
      const escaped = str.replace(/"/g, '""');
      if (str.includes(',') || str.includes('\n') || str.includes('"')) {
        return `"${escaped}"`;
      }
      return escaped;
    };

    // Format CSV row
    const csvRow = [
      escapeCsvField(timestamp),
      escapeCsvField(name),
      escapeCsvField(email),
      escapeCsvField(subject),
      escapeCsvField(message)
    ].join(',');

    // Log submission to console (visible in Netlify function logs)
    console.log('=== NEW FORM SUBMISSION ===');
    console.log('CSV Row:', csvRow);
    console.log('Timestamp:', timestamp);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('=== END SUBMISSION ===');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Form submission logged successfully',
        timestamp: timestamp
      })
    };

  } catch (error) {
    console.error('Error logging submission:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
};