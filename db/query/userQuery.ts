import { eq } from "drizzle-orm";
import { db } from "../drizzleConnection";
import { usersTable } from "../schema";

export async function getUserById(id: number) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.ID, id))
    .limit(1);
  return user[0] || null;
}

export async function createUser(data: any) {
  const user = await db.insert(usersTable).values({
    first_name: data.get("first_name"),
    last_name: data.get("last_name"),
    email: data.get("email"),
  });
  return user;
}

export async function updateUser(data: any, id: number) {
  const user = await db
    .update(usersTable)
    .set({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    })
    .where(eq(usersTable.ID, id));
}

export async function deleteUser(id: number) {
  await db.delete(usersTable).where(eq(usersTable.ID, id));
}
