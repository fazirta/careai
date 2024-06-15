import SignInModule from "@/modules/SignInModule";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (user) redirect("/dashboard");

  return <SignInModule />;
}
