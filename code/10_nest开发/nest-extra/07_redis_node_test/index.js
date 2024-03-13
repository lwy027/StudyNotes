import { createClient } from "redis";
import { cli } from "winston/lib/winston/config";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

const value = await client.keys("*");

await client.hSet("guangguang1", "111", "value111");
await client.hSet("guangguang1", "222", "value222");
await client.hSet("guangguang1", "333", "value333");

client.l;

console.log(value);

await client.disconnect();
