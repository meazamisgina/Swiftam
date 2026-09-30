import { getRequestConfig } from 'next-intl/server';
import enMessages from './messages/en.json';
import amMessages from './messages/am.json';

export default getRequestConfig((async (params: any) => {
  let locale = await params.requestLocale;
  
  if (!locale || !['en', 'am'].includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: locale === 'am' ? amMessages : enMessages
  };
}) as any);