const fs = require('fs').promises;
const path = require('path');

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

    // Define CSV file path (same as in csv-backup.js)
    const csvFilePath = path.join(process.cwd(), 'responses.csv');

    let csvContent = '';

    try {
      // Try to read the existing CSV file
      csvContent = await fs.readFile(csvFilePath, 'utf8');
      console.log('Successfully read CSV file');
    } catch (fileError) {
      console.log('CSV file not found or error reading, creating default content');
      
      // If file doesn't exist, create default content
      const csvHeader = 'Timestamp,Name,Email,Subject,Message\n';
      const sampleData = `"${new Date().toISOString()}","No Submissions Yet","no-submissions@example.com","Welcome","No form submissions have been received yet. This is a placeholder entry."`;
      
      csvContent = csvHeader + sampleData;
    }

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const filename = `portfolio-responses-${currentDate}.csv`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
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