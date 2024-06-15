import TicketModule from "@/modules/TicketModule";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextPage } from "next";

const Page: NextPage<{ params: { ticket_id: string } }> = async ({
  params,
}) => {
  const user = await currentUser();
  if (user) redirect("/dashboard");

  return <TicketModule ticket_id={params.ticket_id} />;
};

export default Page;
