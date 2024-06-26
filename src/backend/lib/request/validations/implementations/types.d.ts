import { NextApiRequest } from "next";
import { IAccountProfile } from "shared/types/user";

export type ValidationImplType<T extends unknown> = (
  req: NextApiRequest & { user?: IAccountProfile },
  config?: unknown
) => Promise<T>;
