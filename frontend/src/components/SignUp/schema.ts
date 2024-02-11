import * as z from 'zod';

export const userEditFormSchema = z.object({
  name: z.string().nonempty({ message: '入力が必須です' }).max(255, { message: '255文字以内で入力してください' }),
  email: z
    .string()
    .nonempty({ message: '入力が必須です' })
    .max(255, { message: '255文字以内で入力してください' })
    .email({ message: '正しいフォーマットで入力してください' }),
  password: z.string().nonempty({ message: '入力が必須です' }).max(255, { message: '255文字以内で入力してください' }),
});

export type UserNewFormSchema = z.infer<typeof userEditFormSchema>;
