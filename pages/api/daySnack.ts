import { prisma } from "./prisma-client";

import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Day } from "@prisma/client";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        //get day of the week
        const dayName = dayjs().format("dddd").toUpperCase();
        console.log(dayName);
        const snackData = await prisma.snack.findFirst({
            where: {
                day: dayName as unknown as Day,
            },
        });
        prisma.$disconnect();
        res.json(snackData.snack);
    }
};
