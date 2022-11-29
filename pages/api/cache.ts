import redisClient from "./redis";
const fetchX = async (key: string, fetcher: () => any, expires: number) => {
    const cachedValue = await get(key);
    if (cachedValue !== null) return cachedValue;
    return await set(key, fetcher, expires);
};

const get = async (key: string) => {
    const cachedValue = await redisClient.get(key);
    if (cachedValue === null) return null;

    return JSON.parse(cachedValue);
};
const set = async (key: string, fetcher: () => any, expires: number) => {
    const value = await fetcher();

    await redisClient.set(key, JSON.stringify(value), {
        EX: expires,
    });

    return value;
};
export default { fetchX, set };
