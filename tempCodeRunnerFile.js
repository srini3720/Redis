async function RedisConnect() {
  const client = redis.createClient({
    url: `redis://:${pass}@${host}:${port}`,
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