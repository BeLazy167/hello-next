import prisma from "../prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const allData = await prisma.user.findMany();
        res.json(allData);
    }
};