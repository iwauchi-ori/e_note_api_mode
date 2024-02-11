import * as z from 'zod';

export const ticketSchema = z.object({
  title: z.string(),
});

export type Ticket = z.infer<typeof ticketSchema>

export const ticketRespSchema = z.object({
  data: z.object({
    id: z.string(),
    type: z.literal('tretterTicket'),
    attributes: ticketSchema,
}),
});

export type TicketResp = z.infer<typeof ticketRespSchema>;