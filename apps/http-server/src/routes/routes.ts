import express from 'express';
import userRouter from './userRouter';
import roomRouter from './roomRouter';

const router: express.Router = express.Router();

router.use('/api/v1/user', userRouter);
router.use('/api/v1/room', roomRouter);

export default router;