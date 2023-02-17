// import { prisma } from "./prisma-client";

// import { NextApiRequest, NextApiResponse } from "next";
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "POST") {
//         console.log(req.body);
//         const { email } = req.body;
//         if (email === null) {
//             res.json({ message: "Email is required" });
//         }
//         const userData = await prisma.user.findMany({
//             where: {
//                 email: email as string,
//             },
//         });
//         prisma.$disconnect();

//         res.json(userData);
//     }
// };

//FOR CACHING DATA

import { prisma } from "./prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import cache from "./cache";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email } = req.body;
        if (email === null) {
            res.json({ message: "Email is required" });
        }
        const findAll = async () => {
            let data = await prisma.user.findMany({
                where: {
                    email: email as string,
                },
            });
            prisma.$disconnect();
            return data;
        };

        const cachedAllData = await cache.fetchX(
            `cachedUserData${email}`,
            findAll,
            60
        );

        res.json(cachedAllData);
    }
};
