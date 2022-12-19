const Joi = require('joi');

export const createComment = Joi.object({
  nickname: Joi.string().trim().required().error(new Error('INVALID_NICKNAME')),
  comment: Joi.string().required().error(new Error('INVALID_COMMENT')),
  articleId: Joi.number().required().error(new Error('INVALID_ARTICLE_ID')),
});

export const getComment = Joi.object({
  articleId: Joi.number().required().error(new Error('INVALID_ARTICLE_ID')),
});

export const commentOnComment = Joi.object({
  nickname: Joi.string().trim().required().error(new Error('INVALID_NICKNAME')),
  comment: Joi.string().required().error(new Error('INVALID_COMMENT')),
  commentId: Joi.number().required().error(new Error('INVALID_COMMENT_ID')),
});
