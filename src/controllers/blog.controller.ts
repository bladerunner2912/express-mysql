import { Request, Response } from "express";
const log = console.log;
import Blog from "../models/blogs";
import chalk from "chalk";

const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.create(req.body);
    return res.status(200).json(blog);
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    // user_id which will be added to request body object by verify-jwt-token
    let user_id = req.body.user_id;
    const blog = await Blog.findByPk(req.body.blog_id);
    if (blog) {
      if (blog.dataValues.user_id == user_id) {
        const updated_blog = await blog.update(req.body);
        return res.status(200).json(updated_blog);
      }
      return res.status(201).json({
        message:
          "User isnt the author of following blog hence no update priviliges.",
      });
    }
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    let blog_id = req.body.blog_id;

    const blog = await Blog.findByPk(blog_id);
    if (blog && blog.dataValues.user_id == req.body.user_id) {
      const deleted_blog = blog.destroy();
      return res.status(200).json(deleted_blog);
    }
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

export default { createBlog, updateBlog, deleteBlog };
