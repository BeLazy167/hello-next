import { prisma } from "./prisma-client";

import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const snackData = req.body;
        const { day, snack } = snackData;
        console.log(`${day} snack data submitted!`);
        const findFirst = await prisma.snack.findFirst({
            where: {
                day: day,
            },
        });
        if (findFirst) {
            const id = findFirst.id;
            const finalData = await prisma.snack.update({
                where: {
                    id: id,
                },
                data: {
                    snack: snack,
                },
            });
            prisma.$disconnect();

            res.json(finalData);
        } else {
            const finalData = await prisma.snack.create({
                data: snackData,
            });
            prisma.$disconnect();

            res.json(finalData);
        }
    }
};
