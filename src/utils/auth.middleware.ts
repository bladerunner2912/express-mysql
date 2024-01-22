import { sign } from "jsonwebtoken";

export const createAccessToken = async (user_id: any): Promise<String> => {
  let token = sign({ user_id: user_id }, "daisy2308", {
    expiresIn: "2h",
  });
  return token;
};
