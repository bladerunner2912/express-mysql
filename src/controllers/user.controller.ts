import chalk from "chalk";
import User from "../models/users";
import { Request, Response } from "express";
const log = console.log;

const registerUser = async (req: Request, res: Response) => {
  try {
    let user = await User.create(req.body);
    log(chalk.whiteBright(user));
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ where: { username: username } });
    // we are not getting the user as object but json hence password fetching from user is done this way
    // console.log(user!.dataValues.password);
    if (!user) {
      return res
        .status(200)
        .json({ message: `No account registered under ${username}` });
    }
    if (user.dataValues.password === password) {
      return res.status(200).json(user);
    } else {
      return res.status(200).json({ message: "Incorrect Password" });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    let user_id = req.body.user_id;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res
        .status(200)
        .json({ message: `No account registered under user_id ${user_id}` });
    } else {
      const updatedUser = await user.update(req.body);
      return res.status(200).json(updatedUser);
    }
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

export default { registerUser, loginUser, updateUser };
