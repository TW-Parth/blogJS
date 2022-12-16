import express from 'express';
const router = express.Router();
import articleRouter from './article.routes';

router.get('/', async (req, res) => {
  return res.send({
    name: 'API',
    status: 'IT_WORKS',
    message: 'Yes, this is the correct basePath!',
  });
});

router.use('/article', articleRouter);

export default router;
