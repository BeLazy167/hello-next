// non cached code
// import { prisma } from "./prisma-client";

// import { NextApiRequest, NextApiResponse } from "next";
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "GET") {
//         const allData = await prisma.snack.findMany();
//         prisma.$disconnect();
//         res.json(allData);
//     }
// };

//FOR CACHING DATA

import { prisma } from "./prisma-client";
import cache from "./cache";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    function findAll() {
        let data = prisma.snack.findMany();
        prisma.$disconnect();
        return data;
    }
    const cachedAllData = await cache.fetchX("allSnackData", findAll, 60);

    if (req.method === "GET") {
        res.json(cachedAllData);
    }
};
