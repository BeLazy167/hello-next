import { prisma } from "./prisma-client";

import { NextApiRequest, NextApiResponse } from "next";
// id: "cl8zt9qxh0038k0a06s6sd9io"
// createdAt: "2022-10-08T11:06:24.533Z"
// updatedAt: "2022-10-08T11:40:06.101Z"
// toSend: false
// taskId: 2
// task: "Do you want to send mail to vendor?"
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const notificationData = req.body;
        const { id, toSend } = notificationData;
        console.log(`Notification ${id} updated!`);
        const finalData = await prisma.notification.update({
            where: {
                id: id,
            },
            data: {
                toSend: toSend,
            },
        });
        prisma.$disconnect();

        res.json(finalData);
    }
};
