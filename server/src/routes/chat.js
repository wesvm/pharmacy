import { Router } from "express";
import chatController from '../controllers/chat.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.use(rateLimiter);
router.post('/message', chatController.sendMessage);
// router.delete('/conversation/:conversationId', chatController.clearConversation);

export default router;