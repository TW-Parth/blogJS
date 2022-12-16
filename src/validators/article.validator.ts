const Joi = require("joi");

export const createArticle = Joi.object({
  nickname: Joi.string().trim().required().error(new Error("INVALID_NICKNAME")), 
  title: Joi.string().trim().required().error(new Error("INVALID_TITLE")),
  content: Joi.string().trim().required().error(new Error("INVALID_CONTENT")),
});