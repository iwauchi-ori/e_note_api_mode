import { regExps } from 'src/util/regExps';

/** 自然数の文字列かどうか */
export const isStrOfPositiveNum = (val: unknown): val is string => typeof val === 'string' && Number(val) > 0;

/** 0以上の整数の文字列かどうか */
export const isStrOfPositiveNumOrZero = (val: unknown): val is string => typeof val === 'string' && Number(val) >= 0;

/** ブランクでない文字列かどうか */
export const isStrNotBlank = (val: unknown): val is string => typeof val === 'string' && val.length > 0;

/** APIをコール可能な文字列形式の日付かどうか */
export const isStrOfDateForReq = (val: unknown): val is string =>
  typeof val === 'string' && regExps.dateForReq.test(val);

/** APIをコール可能な文字列形式の1日の日付かどうか */
export const isStrOfBeginningOfMonth = (val: unknown): val is string =>
  typeof val === 'string' && regExps.beginningOfMonth.test(val);

/** APIをコール可能な文字列形式の日付かどうか */
export const isValidDate = (val: unknown): val is string => typeof val === 'string' && regExps.dateForReq.test(val);

/** 自然数かどうか */
export const isNumOfPositive = (val: unknown): val is number => typeof val === 'number' && val > 0;
