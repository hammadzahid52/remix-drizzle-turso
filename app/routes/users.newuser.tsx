import { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  NavLink,
} from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { createUser } from "../../db/query/userQuery";
import { UploadButton } from "~/lib/uploadthing";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const user = await createUser(formData);
  if (user) {
    return redirect(`/users/${user.lastInsertRowid}`);
  }
};

export default function NewUser() {
  const fetcher = useFetcher({ key: "users" });
  return (
    <div>
      <fetcher.Form method="post" className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <Input name="first_name" placeholder="First Name" />
          <Input name="last_name" placeholder="Last Name" />
          <Input name="email" placeholder="Email" />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <div className="flex gap-5">
            <Button type="submit">Create User</Button>
            <NavLink
              to="/"
              className=" bg-gray-950 text-white w-24 grid place-items-center"
            >
              Cancel
            </NavLink>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
}
