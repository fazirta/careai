"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/db";
import { User } from "@clerk/backend";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { Ticket } from "@/app/db/schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";

async function takeTicket(
  router: AppRouterInstance,
  ticket_id: string,
  user_id: string
) {
  try {
    await db
      .update(Ticket)
      .set({ assigned_agent_id: user_id })
      .where(eq(Ticket.ticket_id, ticket_id));

    router.push(`/dashboard/ticket/${ticket_id}`);
  } catch (error) {
    console.error("Error taking ticket:", error);
    throw error;
  }
}

export const DashboardModule: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const [openTickets, setOpenTickets] = useState<(typeof Ticket)[]>([]);
  const [assignedTickets, setAssignedTickets] = useState<(typeof Ticket)[]>([]);

  useEffect(() => {
    async function fetchTicketsAndCount() {
      const tickets = await db.query.Ticket.findMany();
      const openTickets = tickets.filter(
        (ticket) =>
          ticket.status === "open" && ticket.assigned_agent_id !== user.id
      );
      const assignedTicket = tickets.filter(
        (ticket) => ticket.assigned_agent_id === user.id
      );

      setOpenTickets(openTickets);
      setAssignedTickets(assignedTicket);
    }

    fetchTicketsAndCount();
  }, []);

  return (
    <div className="pt-10 flex flex-col gap-10 justify-center items-center">
      <div>
        <h1 className="text-xl font-semibold">
          Open Tickets: {openTickets.length}
        </h1>
        <h1 className="text-xl font-semibold">
          Assigned to me: {assignedTickets.length}
        </h1>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Open Tickets</h1>
          <ul className="flex flex-col gap-5">
            {openTickets.map((ticket) => (
              <li key={ticket.ticket_id}>
                <div>Name: {ticket.name}</div>
                <div>Location: {ticket.location}</div>
                <div>Issue Description: {ticket.issue_description}</div>
                <button
                  onClick={() => takeTicket(router, ticket.ticket_id, user.id)}
                  className="mt-2 px-8 py-2 bg-slate-600 text-white font-semibold rounded-2xl"
                >
                  Take
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Assigned Tickets</h1>
          <ul className="flex flex-col gap-5">
            {assignedTickets.map((ticket) => (
              <li key={ticket.ticket_id}>
                <div>Name: {ticket.name}</div>
                <div>Location: {ticket.location}</div>
                <div>Issue Description: {ticket.issue_description}</div>
                <Link href={`/dashboard/ticket/${ticket.ticket_id}`}>
                  <div className="w-min mt-2 px-8 py-2 bg-slate-600 text-white font-semibold rounded-2xl">
                    Open
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
