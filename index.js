const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
app.use(bodyParser.json());

// Configure DynamoDB
AWS.config.update({ region: 'ap-south-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// API to fetch products from DynamoDB
app.get('/products', async (req, res) => {
    const params = {
        TableName: 'Products'
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch products' });
    }
});

// Sample route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
