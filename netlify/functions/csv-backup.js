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
      // Convert to string and escape quotes by doubling them
      const str = String(field || '');
      const escaped = str.replace(/"/g, '""');
      // Wrap in quotes if contains comma, newline, or quote
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

    // Create CSV header
    const csvHeader = 'Timestamp,Name,Email,Subject,Message';

    // Log the data (this will appear in Netlify function logs)
    console.log('=== FORM SUBMISSION CSV BACKUP ===');
    console.log('Header:', csvHeader);
    console.log('Data:', csvRow);
    console.log('Raw data:', { timestamp, name, email, subject, message });
    console.log('=== END CSV BACKUP ===');

    // In a production environment, you could:
    // 1. Store in a database (like Supabase, Firebase, etc.)
    // 2. Send to Google Sheets API
    // 3. Store in cloud storage (AWS S3, etc.)
    // 4. Send via email

    // For now, we'll return the CSV data so it can be logged
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Form data backed up successfully',
        timestamp: timestamp,
        csvData: {
          header: csvHeader,
          row: csvRow
        }
      })
    };

  } catch (error) {
    console.error('Error in CSV backup:', error);
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