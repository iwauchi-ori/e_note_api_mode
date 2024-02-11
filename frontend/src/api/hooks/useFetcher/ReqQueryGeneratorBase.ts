import type { ReqQueryBase } from './types';

export abstract class ReqQueryGeneratorBase<T extends NonNullable<ReqQueryBase>> {
  protected reqQuery: T;

  constructor({ initialReqQuery }: { initialReqQuery: T }) {
    this.reqQuery = initialReqQuery;
  }

  /** this.reqQuery を返す */
  public getReqQuery(): T {
    return this.reqQuery;
  }

  /** this.reqQuery が '空のオブジェクト' または '全ての値が undefined なオブジェクト' ならば true を返す */
  public isEmpty(): boolean {
    const hasKey = Object.keys(this.reqQuery).length > 0;
    if (!hasKey) return true;

    const areAllUndefined = Object.values(this.reqQuery).every((q) => q === undefined);
    return areAllUndefined;
  }
}
