import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const Ticket = pgTable("tickets", {
  ticket_id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name"),
  location: text("location"),
  open_time: timestamp("open_time").defaultNow().notNull(),
  assigned_agent_id: text("assigned_agent_id"),
  status: text("status", { enum: ["open", "closed", "assigned"] }).default(
    "open"
  ),
  issue_description: text("issue_description"),
  priority: text("priority", { enum: ["low", "medium", "high"] }).default(
    "medium"
  ),
  last_updated: timestamp("last_updated").defaultNow().notNull(),
});
