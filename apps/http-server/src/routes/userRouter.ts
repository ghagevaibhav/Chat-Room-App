import express from 'express';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const { CreateUserSchema, SigninSchema } = await import('@repo/common/index');
const { JWT_SECRET } = await import("@repo/backend-common/index");
const { prisma } = await import('@repo/db/index');

const userRouter: express.Router = express.Router();

userRouter.post('/signup', async (req, res) => {
    
    const parsedData = CreateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        console.error(parsedData.error);
        res.status(400).json({ message: 'Invalid input data' });
        return
    }

    try {
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

        res.status(500).json({ message: 'Internal Server Error  maki    ' });
    }
});

userRouter.post('/signin', async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success) {
        console.error(parsedData.error);
        res.status(400).json({ message: 'Invalid input data' });
        return
    }
})


export default userRouter;