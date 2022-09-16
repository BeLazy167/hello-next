import { prisma } from "../prisma-client";

import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const userData = req.body;
        const { name, email, snack } = userData;

        const findFirst = await prisma.user.findFirst({
            where: {
                AND: [
                    {
                        email: email,
                    },
                    {
                        createdAt: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0)),
                            lte: new Date(new Date().setHours(23, 59, 59, 999)),
                        },
                    },
                ],
            },
        });
        if (findFirst) {
            const id = findFirst.id;
            const finalData = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    snack: snack,
                },
            });
            finalData["isFound"] = true;
            console.log(`${name} just re-submitted the form!`);
            prisma.$disconnect();
            res.json(finalData);
        } else {
            const finalData = await prisma.user.create({
                data: userData,
            });
            console.log(`${name} just submitted the form!`);

            prisma.$disconnect();
            finalData["isFound"] = true;
            res.json(finalData);
        }
    }
};
