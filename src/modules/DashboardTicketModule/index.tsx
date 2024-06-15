import { db } from "@/app/db";
import { User } from "@clerk/backend";
import { redirect } from "next/navigation";

async function getTicket(ticket_id: string) {
  return db.query.Ticket.findFirst({
    where: (tickets, { eq }) => eq(tickets.ticket_id, ticket_id),
  });
}

export const DashboardTicketModule: React.FC<{
  user: User;
  ticket_id: string;
}> = async ({ user, ticket_id }) => {
  let ticket;
  try {
    ticket = await getTicket(ticket_id);
    if (ticket?.status == "closed" || ticket?.assigned_agent_id !== user.id)
      redirect("/dashboard");
  } catch (error) {
    redirect("/dashboard");
  }

  return (
    <div>
      <div>{JSON.stringify(ticket)}</div>
    </div>
  );
};
