import { prisma } from "./prisma-client";

import { NextApiRequest, NextApiResponse } from "next";
function filer(stats: any) {
    let objf = {};
    stats?.map((each) => {
        if (objf[each.snack] === undefined) {
            objf[each.snack] = {
                count: 1,
                names: [each.name],
            };
        } else {
            objf[each.snack]["names"].push(each.name);
            objf[each.snack]["count"] += 1;
        }
    });
    console.log(objf);
    return objf;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        let before = new Date(new Date().setHours(0, 0, 0, 0));
        let after = new Date(new Date().setHours(23, 59, 59, 999));
        console.log(before, after);
        const todayData = await prisma.user.findMany({
            where: {
                createdAt: {
                    gte: before,
                    lte: after,
                },
            },
        });

        prisma.$disconnect();
        res.json({ todayData: filer(todayData), length: todayData.length });
    }
};
