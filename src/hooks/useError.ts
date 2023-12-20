import useMessage from 'antd/es/message/useMessage';
import { useEffect } from 'react';

import type { schemas } from '@/services/type';
import type { ZodiosError } from '@zodios/core';
import type { z } from 'zod';

type Errors =
  | z.infer<(typeof schemas)['ErrorMessage']>
  | "Zodios: Invalid Body parameter 'body'"
  | 'NoMatch';

const INIT_MESSAGES: Record<Errors, string | undefined> = {
  NotFound: '您未曾使用過該帳號註冊',
  EmailExists: '此電子郵件已註冊！',
  LoginFailed: '登入失敗',
  "Zodios: Invalid Body parameter 'body'": '請輸入正確格式的電子郵件！',
  WrongPassword: '密碼錯誤',
  AckException: '',
  UniqueViolationError: '',
  LoginExpired: '',
  NoPermission: '',
  IllegalInput: '',
  CourtReserved: '',
  ReservationFull: '',
  VenueUnreservable: '',
  CourtUnreservable: '',
  NoMatch: undefined,
};

export default function useError<T extends Error | ZodiosError | null>(
  error: T,
  contents?: { [key in Errors]?: string },
  handleError?: () => void,
) {
  const [message, context] = useMessage();

  useEffect(() => {
    if (error) {
      void message.error(
        contents?.[error.message as Errors] ??
          (INIT_MESSAGES[error.message as Errors]
            ? INIT_MESSAGES[error.message as Errors]
            : error.message),
      );
      handleError?.();
    }
  }, [contents, error, handleError, message]);

  return { context };
}
