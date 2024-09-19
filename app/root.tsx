import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import "./tailwind.css";
import { db } from "db/drizzleConnection";
import { usersTable } from "db/schema";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = async () => {
  const users = await db.select().from(usersTable).all();
  return json({ users });
};

export default function App() {
  const navigation = useNavigation();
  const { users } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex">
          <aside className="h-screen sticky top-0 bg-slate-900 text-white w-60 p-5 overflow-y-scroll">
            <div className="flex flex-col gap-2">
              <NavLink to="users/newuser" className="mb-5">
                Create new user
              </NavLink>
              {users.length ? (
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li key={user.ID}>
                      <NavLink className="" to={`users/${user.ID}`}>
                        {user.first_name || user.last_name ? (
                          <>
                            {user.first_name} {user.last_name}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No contacts</i>
                </p>
              )}
            </div>
          </aside>
          <div className="w-full p-5">
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
