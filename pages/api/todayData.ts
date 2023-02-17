//For non cache version

// import { prisma } from "./prisma-client";
// import { NextApiRequest, NextApiResponse } from "next";
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "GET") {
//         let before = new Date(new Date().setHours(0, 0, 0, 0));
//         let after = new Date(new Date().setHours(23, 59, 59, 999));
//         console.log(before, after);
//         const todayData = await prisma.user.findMany({
//             where: {
//                 createdAt: {
//                     gte: before,
//                     lte: after,
//                 },
//             },
//         });
//         prisma.$disconnect();
//         res.json(todayData);
//     }
// };

// For Cache

import { prisma } from "./prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import cache from "./cache";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const findAll = async () => {
        let before = new Date(new Date().setHours(0, 0, 0, 0));
        let after = new Date(new Date().setHours(23, 59, 59, 999));
        let data = await prisma.user.findMany({
            where: {
                createdAt: {
                    gte: before,
                    lte: after,
                },
            },
        });
        prisma.$disconnect();
        return data;
    };

    const cachedAllData = await cache.fetchX("cachedTodayData", findAll, 10);

    if (req.method === "GET") {
        const allData = cachedAllData;
        res.json(allData);
    }
};
