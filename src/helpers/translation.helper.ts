import _ from 'lodash';

export function getTranslatedMessage({ messages, language = 'en', key }: { messages: any; language: string; key: string }) {
  let message = '';
  let languageMessages = _.get(messages, language, '');

  if (!languageMessages) {
    languageMessages = messages.en;
  }

  message = _.get(languageMessages, key, key);

  return message;
}
