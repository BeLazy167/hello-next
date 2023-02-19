import { prisma } from "./prisma-client";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const findAll = async () => {
        let { before, after } = req.body;
        before = new Date(before);
        after = new Date(after);
        console.log(before, after);
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
        res.json(allData);
    }
};
