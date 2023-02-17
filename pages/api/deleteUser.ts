import { prisma } from "./prisma-client";

import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    //this code is to delete all users
    // if (req.method === "GET") {
    //     const allData = await prisma.user.deleteMany();
    //     prisma.$disconnect();
    //     res.json(allData);
    // }
    
    if (req.method === "POST") {
        const { email } = req.body;
        if (email === null) {
            res.json({ message: "Email is required" });
        }
        const userData = await prisma.user.deleteMany({
            where: {
                email: email as string,
            },
        });
        prisma.$disconnect();

        res.json(userData);
    }
};
