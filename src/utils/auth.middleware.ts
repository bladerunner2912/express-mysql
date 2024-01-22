import { sign } from "jsonwebtoken";
import config from "../config";
export const createAccessToken = async (user_id: any): Promise<String> => {
  let token = sign({ user_id: user_id }, config.jwt_secret!, {
    expiresIn: "2h",
  });
  return token;
};
