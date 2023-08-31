import * as jwt from "jsonwebtoken";

type TokenData = { uid: number };

export const verifiedToken = <T = TokenData>(headers: Headers) => {
  const authorizationHeader = headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return null;
  }
  const token = authorizationHeader.split(" ")[1];
  const data = jwt.verify(token, process.env.SECRET as string) as T;
  return data;
};
