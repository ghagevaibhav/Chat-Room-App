import express from 'express';

const roomRouter: express.Router = express.Router();

roomRouter.get('/', (req, res) => {
    res.json({ message: 'User API is running!' });
})

export default roomRouter;