import chalk from "chalk";
import User from "../models/users";
import { Request, Response } from "express";
import { createAccessToken } from "../utils/auth.middleware";
const log = console.log;

const registerUser = async (req: Request, res: Response) => {
  try {
    let newUser = await User.create(req.body);
    const token = await createAccessToken(newUser.user_id);
    res.status(200).json({ user: newUser, token: token });
  } catch (e) {
    res.status(400).json(e);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    // console.log(req.body);
    let user = await User.findOne({ where: { username: username } });
    // we are not getting the user as object but json hence password fetching from user is done this way
    // console.log(user!.dataValues.password);
    if (!user) {
      return res
        .status(200)
        .json({ message: `No account registered under ${username}` });
    }
    if (user.dataValues.password === password) {
      const token = await createAccessToken(user.dataValues.user_id);
      return res.status(200).json({ user: user, token: token });
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
    }
    if (user_id == user.dataValues.user_id) {
      const updatedUser = await user.update(req.body);
      return res.status(200).json(updatedUser);
    } else {
      return res
        .status(300)
        .json({ message: "Priveleges to update users are denied" });
    }
  } catch (e) {
    log(chalk.red(e));
    res.status(400).json(e);
  }
};

//logout --> Delete the accesstoken stored or cached in local storage of frontend client.

export default { registerUser, loginUser, updateUser };
