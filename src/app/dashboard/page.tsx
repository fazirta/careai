import DashboardModule from "@/modules/DashboardModule";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/");

  return <DashboardModule />;
}
