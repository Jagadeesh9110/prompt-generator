const https = require('http');

const data = JSON.stringify({
    intent: "Help me fix a memory leak in React",
    category: "Development"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/compile',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => console.log('BODY:', body));
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
