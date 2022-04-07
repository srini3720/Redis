const redis = require("redis");
require("dotenv").config();
// import JSONCache from "redis-json";
const { JSONCache } = require("redis-json");
// const jsonCache = new JSONCache(redis);

const db = [
  {
    project_id: "ac74fc42-2235eb9d2a3f",
    src_directory: "reactapp/src",
    test_directory: "react/tests",
  },
  {
    project_id: "a2c4fc402-25eb9d2a4f",
    src_directory: "springapp/src/main",
    test_directory: "springapp/test",
  },
  {
    project_id: "a27fc32-2235eb9d2a5f",
    src_directory: "reactapp/src",
    test_directory: "react/tests",
  },
  {
    project_id: "a2c744a3-223b9d2a6f",
    src_directory: "springapp/src/main",
    test_directory: "springapp/test",
  },
  {
    project_id: "a2c4a32-2235eb9d2a7f",
    src_directory: "reactapp/src",
    test_directory: "react/tests",
  },
  {
    project_id: "a2c74fc4a0235eb9da7f",
    src_directory: "reactapp/src",
    test_directory: "react/tests",
  },
];

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

  //pushing the data to redis in RAW REDIS COMMAND
  //   const srcPath = [];
  //   const testPath = [];

  //   for (let i = 0; i < db.length; i++) {
  //     if (await client.exists(db[i].project_id)) {
  //       const path = await client.sendCommand(["GET", `${db[i].project_id}`]);
  //       console.log(`${db[i].project_id}`)
  //       console.log(path[0]);
  //       srcPath[i] = path.srcPath;
  //       console.log(path[0]);
  //       testPath[i] = path.testPath;

  //     } else {
  //       srcPath[i] = db[i].src_directory;
  //       testPath[i] = db[i].test_directory;
  //       await client.sendCommand([
  //         "SET",
  //         `${db[i].project_id}`,
  //         `{srcPath:${db[i].src_directory},testPath: ${db[i].test_directory}}`,
  //       ]);
  //     }
  //   }
  //   console.log(srcPath);
  //   console.log(testPath);

  //   const path = await client.sendCommand(['SET', `${db[0].project_id}`, `{srcPath: ${db[0].src_directory}, testPath: ${db[0].test_directory}}`]);
  //   console.log(path);
  //   const get = await client.sendCommand(['GET', `${db[0].project_id}`]);;
  //   console.log(get);

  // redis data in JSON
  const srcPath = [];
  const testPath = [];

  for (let i = 0; i < db.length; i++) {
    if (await client.exists(db[i].project_id)) {
      const path = await client.get(`${db[i].project_id}`);
      console.log(`${db[i].project_id}`);
      console.log(path);
      srcPath[i] = path.srcPath;
      console.log(path.toString());
      testPath[i] = path.testPath;
    } else {
      srcPath[i] = db[i].src_directory;
      testPath[i] = db[i].test_directory;
      const pathJson = {
        srcPath: db[i].src_directory,
        testPath: db[i].test_directory,
      };
      console.log(`${db[i].project_id}`);
      await client.json.set(`${db[i].project_id}`, pathJson);
    }
  }
  console.log(srcPath);
  console.log(testPath);

  //json-redis npm package
  //   const srcPath = [];
  //   const testPath = [];

  await client.disconnect();
}
RedisConnect();
