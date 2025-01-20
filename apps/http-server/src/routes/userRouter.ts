import express from 'express';
import { JWT_SECRET } from "@repo/backend-common/index"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

const userRouter: express.Router = express.Router();

userRouter.post('/signup', async (req, res) => {
    const { CreateUserSchema } = await import('@repo/common/index');
    const parsedData = CreateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        console.error(parsedData.error);
        res.status(400).json({ message: 'Invalid input data' });
        return
    }

    try {
        const { prisma } = await import('@repo/db/index');
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
        const user = await prisma.user.create({
            data: {
                email: parsedData.data.username,
                password: hashedPassword,
                name: parsedData.data.name,
            },
        });
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            userId: user.id,
            token,
            message: 'User Signed Up Successfully',
        });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2002') {
            res.status(409).json({ message: 'User already exists' });
            return
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});


export default userRouter;