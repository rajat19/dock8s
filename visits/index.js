const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
   host: 'redis-server',
   port: 6379
});

const redisKey = 'visits';
const port = 8080;

client.set(redisKey, 0);

app.get('/', (req, res) => {
   // process.exit(0);
   client.get(redisKey, (err, visits) => {
      res.send(`Number of visits is ${visits}`);
      client.set(redisKey, parseInt(visits) + 1);
   });
});

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});