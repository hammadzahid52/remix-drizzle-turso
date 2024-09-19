import { json } from "@remix-run/node";
import { Form, useLoaderData, useFetcher, NavLink } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { FunctionComponent } from "react";
import invariant from "tiny-invariant";
import { getUserById } from "db/query/userQuery";
import { Button } from "~/components/ui/button";
import { deleteUser } from "db/query/userQuery";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "User ID is required");
  const user = await getUserById(Number(params.userId));
  if (!user) {
    return json({ error: "User not found" }, { status: 404 });
  }
  return json(user);
};

export default function User() {
  const user = useLoaderData<typeof loader>();

  if ("error" in user) {
    return <h1>{user.error}</h1>;
  }

  return (
    <div className="w-full">
      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src="" alt="" />
        </a>
        <div className="p-5">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {user.ID}
          </p>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.first_name} {user.last_name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {user.email}
          </p>
          <div className="flex gap-3">
            <Form
              action="destroy"
              method="post"
              onSubmit={(event) => {
                const response = confirm(
                  "Please confirm you want to delete this record."
                );
                if (!response) {
                  event.preventDefault();
                }
              }}
            >
              <button
                type="submit"
                className="bg-red-500 text-white w-20 h-10 rounded-xl"
              >
                Delete
              </button>
            </Form>
            <NavLink
              to={`/users/${user.ID}/edit`}
              className="bg-blue-500 text-white w-20 h-10 rounded-xl grid place-items-center"
            >
              update
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
