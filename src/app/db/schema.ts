import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const Ticket = pgTable("tickets", {
  ticket_id: uuid("id").defaultRandom().notNull().primaryKey(),
  assigned_agent_id: text("assigned_agent_id"),
  open_time: timestamp("open_time").defaultNow().notNull(),
  status: text("status", { enum: ["open", "closed", "assigned"] }).default(
    "open"
  ),
  priority: text("priority", { enum: ["low", "medium", "high"] }).default(
    "medium"
  ),
  last_updated: timestamp("last_updated").defaultNow().notNull(),
  name: text("name"),
  email: text("email"),
  location: text("location"),
  issue_description: text("issue_description"),
  issue_summary: text("issue_summary"),
  sentiment: text("sentiment"),
});

export const MockFeels = pgTable("mockFeels", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  feel: varchar("feel").notNull(),
  feelDesc: varchar("feelDesc").notNull(),
  language: varchar("language").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  userAns: text("userAns"),
  feedback: text("feedback"),
  language: varchar("language").notNull(),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});
