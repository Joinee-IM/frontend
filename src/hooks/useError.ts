import useMessage from 'antd/es/message/useMessage';
import { useEffect } from 'react';

import type { ZodiosError } from '@zodios/core';

type Errors = 'LoginFailed' | 'EmailExists' | 'NotFound' | "Zodios: Invalid Body parameter 'body'";

const INIT_MESSAGES: Record<Errors, string> = {
  NotFound: '您未曾使用過該帳號註冊',
  EmailExists: '此電子郵件已註冊！',
  LoginFailed: '登入失敗',
  "Zodios: Invalid Body parameter 'body'": '請輸入正確格式的電子郵件！',
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
        contents?.[error.message as Errors] ?? INIT_MESSAGES[error.message as Errors],
      );
      handleError?.();
    }
  }, [contents, error, handleError, message]);

  return { context };
}
