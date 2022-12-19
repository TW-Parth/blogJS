import express from 'express';
const router = express.Router();
import articleRouter from './article.routes';
import commentRouter from './comment.routes';
router.get('/', async (req, res) => {
  return res.send({
    name: 'API',
    status: 'IT_WORKS',
    message: 'Yes, this is the correct basePath!',
  });
});

router.use('/article', articleRouter);
router.use('/comment', commentRouter);

export default router;
