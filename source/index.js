const express = require('express');
const redis = require('redis');
const { Pool } = require('pg');

// Create an instance of Express
const app = express();

// Create a Redis client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

// Create a PostgreSQL pool
const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE
});

// Define a route
app.get('/', async (req, res) => {
    try {
        // Connect to Redis and retrieve data
        const cacheData = await new Promise((resolve, reject) => {
            redisClient.get('cacheKey', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Query the PostgreSQL database
        const dbData = await pool.query('SELECT * FROM mytable');

        // Send the response
        res.json({
            cacheData,
            dbData: dbData.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});