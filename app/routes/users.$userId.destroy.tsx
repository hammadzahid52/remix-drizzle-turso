import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteUser } from "db/query/userQuery";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.userId, "User ID is required");
  await deleteUser(Number(params.userId));
  redirect(`/`);
  return null;
};
