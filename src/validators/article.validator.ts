const Joi = require('joi');

export const createArticle = Joi.object({
  nickname: Joi.string().trim().required().error(new Error('INVALID_NICKNAME')),
  title: Joi.string().trim().required().error(new Error('INVALID_TITLE')),
  content: Joi.string().required().error(new Error('INVALID_CONTENT')),
});

export const getArticles = Joi.object({
  page: Joi.number().optional().default(1).error(new Error('INVALID_PAGE')),
  limit: Joi.number().optional().default(20).error(new Error('INVALID_LIMIT')),
});

export const getArticle = Joi.object({
  articleId: Joi.number().required().error(new Error('INVALID_ARTICLE_ID')),
});
