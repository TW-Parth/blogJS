import express from 'express';
import requestValidator from '../middlewares/requestValidator.middleware';
import * as controllers from '../controllers/comment.controller';
import * as validators from '../validators/comment.validator';

const router = express.Router();

router.post('/:articleId', requestValidator(validators.createComment), controllers.create);
router.get('/:articleId', requestValidator(validators.getComment), controllers.getComments);
router.post('/onComment/:commentId', requestValidator(validators.commentOnComment), controllers.addCommentOnComment);

export default router;
