import { Request, Response } from 'express';
import { Article, Comment } from '../db/models';

export async function create(req: Request, res: Response) {
  try {
    const { comment: text, nickname, articleId }: { comment: string; nickname: string; articleId: number } = req.validatedParams;
    const isExist = await Article.findByPk(articleId);
    if (!isExist) {
      return res.error({ message: 'ARTICLE_NOT_FOUND' });
    }
    const comment = await Comment.create({ comment: text, nickname, articleId });

    return res.ok({ data: { comment } });
  } catch (e) {
    return res.internalServerError(e);
  }
}

export async function getComments(req: Request, res: Response) {
  try {
    const { articleId } = req.validatedParams;
    const isExist = await Article.findByPk(articleId);
    if (!isExist) {
      return res.error({ message: 'ARTICLE_NOT_FOUND' });
    }
    const comments = await Comment.findAll({
      where: { articleId },
    });
    return res.ok({ data: { comments } });
  } catch (e) {
    return res.internalServerError(e);
  }
}

export async function addCommentOnComment(req: Request, res: Response) {
  try {
    const { comment: text, nickname, commentId }: { comment: string; nickname: string; commentId: number } = req.validatedParams;
    const isExist = await Comment.findByPk(commentId);
    if (!isExist) {
      return res.error({ message: 'COMMENT_NOT_FOUND' });
    }
    const comment = await Comment.create({ comment: text, nickname, commentId });

    return res.ok({ data: { comment } });
  } catch (e) {
    return res.internalServerError(e);
  }
}
