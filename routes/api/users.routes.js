import { Router } from 'express';
import UserManager from '../../services/userManager.js';
import validateUser from '../../middlewares/validateUser.js';

const router = Router();
const userManager = new UserManager();

router.post('/', validateUser, async (req, res, next) => {
  try {
    const newUser = await userManager.create(req.body);
    res.status(201).json({ statusCode: 201, response: newUser });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await userManager.read();
    res.json({ statusCode: 200, response: users });
  } catch (error) {
    next(error);
  }
});

export default router;
