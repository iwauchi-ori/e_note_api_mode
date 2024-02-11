import type { FC, FocusEventHandler } from 'react';
import type { Ticket as ticketSchema} from 'src/api/schemas/tretter_ticket';

import { useForm } from 'react-hook-form';
import { postTretterTickets } from 'src/api/tretterTickets/postTretterTickets';
import { execAsyncFuncWithVoidReturn } from 'src/util/execAsyncFuncWithVoidReturn';

export const MyTodo: FC = () => {
  const { register, handleSubmit } = useForm<ticketSchema>({
    mode: 'onSubmit',
  });
  const postTodo = async (params: ticketSchema) => {
    await postTretterTickets(params);
  };

  const onSubmit: FocusEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    execAsyncFuncWithVoidReturn(handleSubmit(postTodo));
  };

  return (
    <>
      <div className="ea-main-contents">
        <h1>todoを作成する</h1>
      </div>
      <form onSubmit={onSubmit}>
          <input type="text" {...register('title')}/>
        <button type="submit">ボタン</button>
      </form>
    </>
  );
};
