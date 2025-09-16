exports.handler = async (event, context) => {
  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse form data (from URL-encoded format)
    const formData = new URLSearchParams(event.body);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const subject = formData.get('subject') || '';
    const message = formData.get('message') || '';
    const timestamp = new Date().toISOString();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Missing required fields',
          message: 'Please fill in all required fields'
        })
      };
    }

    // Prepare CSV data with proper escaping
    const escapeCsvField = (field) => {
      // Escape quotes by doubling them and wrap in quotes if contains special chars
      const escaped = field.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const csvRow = [
      escapeCsvField(timestamp),
      escapeCsvField(name),
      escapeCsvField(email),
      escapeCsvField(subject),
      escapeCsvField(message)
    ].join(',') + '\n';

    // For serverless functions, we'll use a simple approach
    // Store CSV data in a way that can be retrieved later
    console.log('CSV Row:', csvRow);

    // In a real implementation, you might want to:
    // 1. Store in a database
    // 2. Send to an external service
    // 3. Use Netlify's built-in form storage

    // For now, we'll log the data and return success
    console.log(`Form submission received:
      Timestamp: ${timestamp}
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}`);

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Form submitted and logged successfully',
        timestamp: timestamp,
        csvRow: csvRow
      })
    };

  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
};