import * as z from 'zod';
// import { validateColorPaletteCode } from './colorPalette';

// ========== schemas
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userRespSchema = z.object({
  data: z.object({
    id: z.string(),
    type: z.literal('user'),
    attributes: userSchema,
  }),
});

export type UserResp = z.infer<typeof userRespSchema>;
