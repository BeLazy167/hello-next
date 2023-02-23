import { prisma } from "./prisma-client";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let { before, after } = req.body;
    const findAll = async () => {
        before = new Date(before);
        after = new Date(after);

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

    if (req.method === "POST") {
        const allData = await findAll();
        console.log(`Date range ${before} - ${after}`);
        res.json(allData);
    }
    console.log("No data");
};
