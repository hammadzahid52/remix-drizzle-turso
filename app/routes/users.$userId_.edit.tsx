import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import { getUserById, updateUser } from "db/query/userQuery";
import invariant from "tiny-invariant";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "User ID is required");
  const user = await getUserById(Number(params.userId));
  if (!user) {
    return json({ error: "User not found" }, { status: 404 });
  }
  return json(user);
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateUser(
    updates as { first_name: string; last_name: string; email: string },
    Number(params.userId)
  );

  return redirect(`/users/${params.userId}`);
};

export default function EditUser() {
  const user = useLoaderData<typeof loader>();
  console.log("user from edit--------?", user);

  if ("error" in user) {
    return <h1>{user.error}</h1>;
  }
  return (
    <div>
      <Form method="post" className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <Input
            name="first_name"
            defaultValue={user.first_name}
            placeholder="First Name"
          />
          <Input
            name="last_name"
            defaultValue={user.last_name}
            placeholder="Last Name"
          />
          <Input name="email" defaultValue={user.email} placeholder="Email" />
          <div className="flex gap-5">
            <Button type="submit">Update user</Button>
            <NavLink
              to="/"
              className=" bg-gray-950 text-white w-24 grid place-items-center"
            >
              Cancel
            </NavLink>
          </div>
        </div>
      </Form>
    </div>
  );
}
