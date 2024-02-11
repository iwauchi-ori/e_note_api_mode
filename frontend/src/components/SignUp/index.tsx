import type { FC, SetStateAction, FocusEventHandler } from 'react';
import type { UserNewFormSchema } from './schema';
import { execAsyncFuncWithVoidReturn } from 'src/util/execAsyncFuncWithVoidReturn';
import { postUserSessions } from 'src/api/userSessions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userEditFormSchema as schema } from './schema';
import { postUsers } from 'src/api/users';

interface IProps {
  onLoginSuccess: () => void | Promise<void>;
}
export const SignUp: FC<IProps> = ({onLoginSuccess}) => {
  const { register, handleSubmit, formState } = useForm<UserNewFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { isDirty, isValid, errors } = formState;

  /** メンバー新規作成リクエスト */
  const createUserRequest = async (data: UserNewFormSchema) => {
    const res = await postUsers(data);
    if (res.isSuccess) {
      console.log('registration is success!');
      const resp = await postUserSessions({
        email: data.email,
        password: data.password,
      });
      if ( resp.isSuccess ) {
        console.log('Login Success');
        await onLoginSuccess();
      } else {
        console.log('Login Failure');
      };
    } else {
      console.log('registration is failed');
    }
  };

  const handleClick = async (data: UserNewFormSchema) => {
    if (!isDirty || !isValid) {
      return;
    }
    await createUserRequest(data);
  };

  const onSubmit: FocusEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    execAsyncFuncWithVoidReturn(handleSubmit(handleClick));
    console.log('onSubmit');
  };

  return (
    <>
      <h1>Or Sign Up?</h1>
      <form onSubmit={onSubmit}>
        <input type="name" placeholder="your name" autoComplete="name" {...register('name')} />
        <input type="email" placeholder="例：test@example.com" autoComplete="email" {...register('email')} />
        <input type="password" autoComplete="password" placeholder="password" {...register('password')} />
        <input type="submit" />
      </form>
    </>
  );
};
