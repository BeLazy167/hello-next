import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

const start = async () => {
    await redisClient.connect();
};
start();
export default redisClient;
