import { Request, Response } from 'express';
import { messages } from '../constants/messages';
import { Blog } from '../db/models'

export async function createBlog(req: Request, res: Response) {
  try {
    const { nickname, title, content } = req.validatedParams;
    const isTitleExist = await Blog.findOne({where: {title}})
    if(isTitleExist){
      return res.error({message: 'TITLE_IS_ALREADY_USED'})
    }
    const blog = await Blog.create({ nickname, title, content });

    return res.ok({ data: { blog } });
  } catch (e) {
    return res.internalServerError(e);
  }
}

