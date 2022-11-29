
//TO MIGRATE USE THIS CODE 

// import { prisma } from "./prisma-client";

// import data from "./temp.json";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "GET") {
//         console.log("Snack migration started!", data.length);
//         const finalData = [];
//         data.map((item) => {
//             const { _id, googleId, __v, ...rest } = item;
//             finalData.push(rest);
//         });
//         const dataindb = prisma.user
//             .createMany({
//                 data: finalData,
//             })
//             .then(async () => await prisma.$disconnect());
//         console.log("Snack migration completed!");

//         res.json(dataindb);
//     }
// };

import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.json({ message: "Hello" });
};
