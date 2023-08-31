import * as bcrypt from "bcrypt";

export const hash = {
  async make(plain: string): Promise<string> {
    return await bcrypt.hash(plain, await bcrypt.genSalt(8));
  },
  async verify(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  },
};
