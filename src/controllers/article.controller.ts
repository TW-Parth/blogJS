import { Request, Response } from 'express';
import { messages } from '../constants/messages';
import { Article } from '../db/models'

export async function create(req: Request, res: Response) {
  try {
    const { nickname, title, content } = req.validatedParams;
    const isTitleExist = await Article.findOne({where: {title}})
    if(isTitleExist){
      return res.error({message: 'TITLE_IS_ALREADY_USED'})
    }
    const article = await Article.create({ nickname, title, content });

    return res.ok({ data: { article } });
  } catch (e) {
    return res.internalServerError(e);
  }
}

export async function getArticles(req: Request, res: Response) {
  try {
   
    return res.ok({ data: {  } });
  } catch (e) {
    return res.internalServerError(e);
  }
}

