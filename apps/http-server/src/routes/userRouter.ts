import express from 'express';
import { JWT_SECRET } from "@repo/backend-common/index"

const userRouter: express.Router = express.Router();

userRouter.get('/signup',async  (req, res) => {
    const { CreateUserSchema } = await import("@repo/common/index")
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const { prisma } = await import("@repo/db/index");
        const user = await prisma.user.create({
            data: {
                email: parsedData.data?.username,
                // TODO: Hash the pw
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
})

export default userRouter;