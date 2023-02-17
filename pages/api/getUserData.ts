import { prisma } from "./prisma-client";

import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        console.log(req.body);
        const { email } = req.body;
        if (email === null) {
            res.json({ message: "Email is required" });
        }
        const userData = await prisma.user.findMany({
            where: {
                email: email as string,
            },
        });
        prisma.$disconnect();

        res.json(userData);
    }
};
