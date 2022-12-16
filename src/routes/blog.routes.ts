import express from 'express';
import requestValidator from '../middlewares/requestValidator.middleware';
import * as controllers from '../controllers/blog.controller';
import * as validators from '../validators/blog.validator';

const router = express.Router();

router.post('/', requestValidator(validators.createBlog), controllers.createBlog);

export default router;
