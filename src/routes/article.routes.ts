import express from 'express';
import requestValidator from '../middlewares/requestValidator.middleware';
import * as controllers from '../controllers/article.controller';
import * as validators from '../validators/article.validator';

const router = express.Router();

router.post('/', requestValidator(validators.createArticle), controllers.create);

export default router;