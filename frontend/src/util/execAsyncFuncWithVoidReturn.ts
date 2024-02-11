/**
 * __execAsyncFuncWithVoidReturn__
 *
 * - @typescript/no-misused-promises へ対応するためのラッパー関数です
 * - イベントハンドラーなど、 Promise を返すべきでない関数実行時に async 関数を使用したい時にこのラッパーを使用してください
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-promises.md#checksvoidreturn-true
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/4619
 *
 * @example
 * export const SampleComponent: React.FC = () => {
 *   // ===== async 関数が引数を必要としない場合 =====
 *   const handleClick = async () => {
 *     await someAsyncFunc();
 *   }
 *   // MouseEventHandler は Promise を返すべきでない関数なので execAsyncFuncWithVoidReturn でラップする
 *   const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
 *     execAsyncFuncWithVoidReturn(handleClick);
 *   };
 *   // ===== 以上 async 関数が引数を必要としない場合 =====
 *
 *   // ===== async 関数が引数を必要とする場合 =====
 *   const handleChange = async (arg1: boolean, arg2: string) => {
 *     await someAsyncFunc2(arg1, arg2)
 *   }
 *   // async 関数の引数は execAsyncFuncWithVoidReturn の第二引数に配列で指定する
 *   const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
 *     const args: Parameters<typeof handleChange> = [e.target.checked, 'string'];
 *     execAsyncFuncWithVoidReturn(handleChange, args);
 *   }
 *   // ===== 以上 async 関数が引数を必要とする場合 =====
 *
 *   return (
 *     <>
 *       <button type="button" onClick={onClick}>execute</button>
 *       <input type="checkbox" onChange={onChange} />
 *     </>
 *   )
 * }
 */
export const execAsyncFuncWithVoidReturn = <T>(
  asyncFunc: (...someArgs: any[]) => Promise<T>,
  args: Parameters<typeof asyncFunc> = [],
): void => {
  asyncFunc(...args).catch((e: unknown) => {
    const msg = e instanceof Error ? e.message : '';
    console.log(`Fail at ${execAsyncFuncWithVoidReturn.name}\n${msg}`);
  });
};
