import * as z from 'zod';
import { USER_PASSWORD_POLICY_MESSAGE } from 'src/util/constants';
import { regExps } from 'src/util/regExps';

/**
 * @description LoginFormのschema
 */
export const loginFormSchema = z.object({
  email: z.string().nonempty({ message: '入力が必須です' }).email({ message: 'メールアドレスが不正です' }),
  password: z.string().nonempty({ message: '入力が必須です' }).regex(regExps.password, {
    message: USER_PASSWORD_POLICY_MESSAGE,
  }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
