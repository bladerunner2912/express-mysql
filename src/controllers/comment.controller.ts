import chalk from "chalk";
import { Request, Response } from "express";
const log = console.log;
import Comment from "../models/comments";

const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.create(req.body);
    return res.status(200).json(comment);
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

const fetchComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByPk(req.body.comment_id);
    if (comment) {
      res.status(200).json(comment);
    }
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

const fetchBlogComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll({
      where: { blog_id: req.body.blog_id },
    });
    if (comments) {
      return res.status(200).json(comments);
    }
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByPk(req.body.comment_id);
    if (comment) {
      if (comment.user_id == req.body.user_id) {
        const updated_comment = comment.update(req.body);
        return res.status(200).json(updated_comment);
      }
    }
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByPk(req.body.comment_id);
    if (comment) {
      if (comment.user_id == req.body.user_id) {
        const deleted_comment = comment.destroy();
        return res.status(200).json(deleted_comment);
      }
    }
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

export default {
  createComment,
  updateComment,
  deleteComment,
  fetchBlogComments,
  fetchComment,
};
