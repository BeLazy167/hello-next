import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
export default (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
        res.status(400).send("No body");
        return;
    }
    const { username, password } = req.body;

    res.json({
        token: jwt.sign(
            {
                username: username,
                admin: username === "admin" && password === "admin",
            },
            "DFJKLSAF"
        ),
    });
};
