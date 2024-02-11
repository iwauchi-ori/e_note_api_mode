export const USER_PRIVILEGE_FOR_DISPLAY_MAP = {
  manager: 'マネージャー',
  member: 'メンバー',
} as const;

export const SALES_TIME_MEASUREMENT_MODAL_FOR_DISPLAY_MAP = {
  show: '表示',
  hidden: '非表示',
} as const;

export const USER_DAILY_REPORT_PRIVILEGE_FOR_DISPLAY_MAP = {
  daily_report_manager: 'マネージャー',
  daily_report_member: 'メンバー',
} as const;

export const USER_PASSWORD_POLICY_MESSAGE = '半角英数字を混合させ、8文字以上50文字以下でご記入下さい';

export const STATUS_CLASS = [
  { id: 1, name: '未着手' },
  { id: 2, name: '有効コンタクト' },
  { id: 3, name: '非有効コンタクト' },
];
