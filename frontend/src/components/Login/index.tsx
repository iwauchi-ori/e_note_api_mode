import type { FC, FocusEventHandler } from 'react';
import type { LoginFormSchema } from './schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoginWrapper as Wrapper } from './Wrapper';
import { USER_PASSWORD_POLICY_MESSAGE } from 'src/util/constants';
import { loginFormSchema } from './schema';
import { postUserSessions } from 'src/api/userSessions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { execAsyncFuncWithVoidReturn } from 'src/util/execAsyncFuncWithVoidReturn';

interface IProps {
  onLoginSuccess: () => void | Promise<void>;
}

export const Login: FC<IProps> = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
  });

  const onSubmitLogin = async (data: LoginFormSchema) => {
    const resp = await postUserSessions({
      email: data.email,
      password: data.password,
    });
    if (resp.isSuccess) {
      console.log('Login Success');
      await onLoginSuccess();
    } else {
      console.log('Login Failed');
    }
  };

  const onSubmit: FocusEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    execAsyncFuncWithVoidReturn(handleSubmit(onSubmitLogin));
  };

  return (
    <>
      <Wrapper>
        <h1>Please Log in.</h1>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder="例:test@saleslake.com" {...register('email')} />
          <input type="password" placeholder={USER_PASSWORD_POLICY_MESSAGE} {...register('password')} />
          <input type="submit" />
        </form>
      </Wrapper>
    </>
  );
};
