// non cached code
// import { prisma } from "./prisma-client";
// import { NextApiRequest, NextApiResponse } from "next";
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "GET") {
//         const allData = await prisma.user.findMany();
//         prisma.$disconnect();
//         res.json(allData);
//     }
// };

//FOR CACHING DATA

import { prisma } from "./prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import cache from "./cache";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const findAll = async () => {
        let data = await prisma.user.findMany();
        prisma.$disconnect();
        return data;
    };

    const cachedAllData = await cache.fetchX("cachedAllData", findAll, 60 * 60);
    if (req.method === "GET") {
        const allData = cachedAllData;
        res.json(allData);
    }
};
