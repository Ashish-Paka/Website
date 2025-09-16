exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only handle GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Check if there's a secret key for security
    const { secret } = event.queryStringParameters || {};
    const expectedSecret = process.env.CSV_DOWNLOAD_SECRET || 'ashish-portfolio-secret';

    if (secret !== expectedSecret) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Unauthorized access' })
      };
    }

    // Get form submissions from Netlify API (if available)
    // This is a placeholder - in reality you'd integrate with Netlify API
    // or maintain your own storage

    // For now, return a sample CSV format
    const csvHeader = 'Timestamp,Name,Email,Subject,Message\n';
    const sampleData = `"${new Date().toISOString()}","Sample User","sample@example.com","Test Subject","This is a sample message for CSV format demonstration"`;

    const csvContent = csvHeader + sampleData;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="responses.csv"',
        'Access-Control-Allow-Origin': '*',
      },
      body: csvContent
    };

  } catch (error) {
    console.error('Error generating CSV:', error);
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