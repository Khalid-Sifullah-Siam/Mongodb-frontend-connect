import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createUser = async (formData) => {
  "use server";

  const newUser = Object.fromEntries(formData.entries());

  const res = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const user = await res.json();

  if (user.insertedId) {
    revalidatePath("/users");
  }

  return user;
};

export const updateUser = async (userId, formData) => {
  "use server";

  const updatedUser = Object.fromEntries(formData.entries());

  const res = await fetch(`http://localhost:5000/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  const user = await res.json();

  if (user.modifiedCount > 0) {
    revalidatePath("/users");
    redirect("/users");
  }

  return user;
};

export const deleteUser = async (userId) => {
  "use server";

  const res = await fetch(`http://localhost:5000/users/${userId}`, {
    method: "DELETE",
  });

  const user = await res.json();

  if (user.deletedCount > 0) {
    revalidatePath("/users");
  }
  return user;
};
