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
        const uniqueEmail = [
            ...(new Set(allData.map((item: any) => item.email)) as any),
        ];
        const uniqueSnack = [
            ...(new Set(allData.map((item: any) => item.snack)) as any),
        ];

        res.json({
            count: allData.length,
            distinctUser: uniqueEmail.length,
            disitinctSnack: uniqueSnack.length,
        });
    }
    return;
};
