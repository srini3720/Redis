const redis = require("redis");
require("dotenv").config();



async function RedisConnect() {
  const client = redis.createClient({
    url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });
  await client.on("connect", () => {
    console.log("Redis client connected");
  });
  await client.on("error", (err) => {
    console.log("Error " + err);
  });
  await client.connect();
  
}
RedisConnect();
