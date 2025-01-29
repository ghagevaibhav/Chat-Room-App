import express from 'express';
import { authMiddleware } from '../middleware/middleware.js';
import { CreateRoomSchema } from '@repo/common/index';
import { prisma } from '@repo/db/index';

const roomRouter: express.Router = express.Router();

roomRouter.post('/create', authMiddleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.error(parsedData.error);
        res.status(400).json({ message: 'Invalid input data' });
        return;
    }
    try{
        console.log('User ID:', req.userId);
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return 
        }               
        const room = await prisma.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId as string
            }
        })
        res.status(201).json({ message: 'Room created successfully', roomId: room.id});
        return;
    }
    catch(error){
        console.error(error)
        res.status(500).json({ message: 'Something went wrong server side' });
    }
})

roomRouter.get('/chats/:roomId', async (req, res) => {
    const roomId = Number(req.params.roomId);
    try{
        const messages = await prisma.chat.findMany({
            where: {
                roomId: roomId
            },
            take: 50,
            orderBy: {
                id: 'desc'
            }
        })
        res.json(messages);
    }
    catch(error){
        console.error(error)
        res.status(500).json({ message: 'Something went wrong server side' });
    }
})

export default roomRouter;