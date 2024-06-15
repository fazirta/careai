import { DashboardTicketModule } from "@/modules/DashboardTicketModule";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import { db } from "@/app/db";

async function getTicket(ticketId: string) {
  return await db.query.Ticket.findFirst({
    where: (tickets, { eq }) => eq(tickets.ticket_id, ticketId),
  });
}

const Page: NextPage<{ params: { ticketId: string } }> = async ({ params }) => {
  const user = await currentUser();
  if (!user) redirect("/");

  const ticket = await getTicket(params.ticketId);
  if (ticket?.assigned_agent_id !== user.id) redirect("/");

  return <DashboardTicketModule ticketId={params.ticketId} />;
};

export default Page;
