import type resources from '@/provider/i18n/config/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources;
  }
}
