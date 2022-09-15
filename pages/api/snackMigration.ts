import prisma from "../prisma-client";
import data from "./temp.json";
import { NextApiRequest, NextApiResponse } from "next";

// "_id": "62de1d3ca6f79784863508ac",
// "googleId": "101200388091517654608",
// "name": "Omkar Babrekar",
// "email": "omkar.babrekar@wonderbiz.in",
// "snack": "Samosa Chat",
// "createdAt": "2022-07-25T04:34:04.482Z",
// "updatedAt": "2022-07-25T04:34:04.482Z",
// "__v": 0
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        console.log("Snack migration started!", data.length);
        const finalData = [];
        data.map((item) => {
            const { _id, googleId, __v, ...rest } = item;
            finalData.push(rest);
        });
        const dataindb = prisma.user
            .createMany({
                data: finalData,
            })
            .then(async () => await prisma.$disconnect());
        console.log("Snack migration completed!");

        res.json(finalData);
    }
};
