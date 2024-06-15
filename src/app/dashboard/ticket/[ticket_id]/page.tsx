import { DashboardTicketModule } from "@/modules/DashboardTicketModule";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextPage } from "next";

const Page: NextPage<{ params: { ticket_id: string } }> = async ({
  params,
}) => {
  const user = await currentUser();
  if (!user) redirect("/");

  return (
    <DashboardTicketModule
      user={JSON.parse(JSON.stringify(user))}
      ticket_id={params.ticket_id}
    />
  );
};

export default Page;
