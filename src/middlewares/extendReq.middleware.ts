import debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { getTranslatedMessage } from '../helpers/translation.helper';
import { en } from './../messages';

const { ENVIRONMENT, PROJECT_NAME } = process.env;
const logger = debug('app:extendReqMiddleware');

function parseTemplate(template: string, dataObj: any) {
  return template.replace(/##_.+?_##/gi, (match: string) => {
    const path = match.substring(3, match.length - 3);

    return _.get(dataObj, path, '');
  });
}

export function translation({ language, key, dataObj }: { language: string; key: string; dataObj?: any }) {
  let message = getTranslatedMessage({ messages: { en }, key, language });
  if (dataObj) {
    message = parseTemplate(message, dataObj);
  }
  return message;
}

export function extendReqMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.__ = (key: string) => {
      return translation({ key, language: req.acceptsLanguages()[0] });
    };
    req.allParams = () => _.merge(req.params, req.query, req.body);

    res.set('x-application-identifier', `${PROJECT_NAME}-${ENVIRONMENT}`);

    res.ok = (resPayload = { message: 'SUCCESS', data: {}, statusCode: 200 }) => {
      if (typeof resPayload === 'string') {
        let response;
        response = { statusCode: 200, status: resPayload, data: {}, message: res.__(resPayload) };
        return res.send(response);
      }

      const { message = 'SUCCESS', data = {} } = resPayload;
      let response;
        response = { statusCode: 200, status: message, message: res.__(message), data }

      return res.status(200).send(response);
    };

    res.error = (resPayload, debugMessage) => {
      if (debugMessage) {
        logger(debugMessage);
      }

      if (typeof resPayload === 'string') {
        return res.status(400).send({ statusCode: 400, status: resPayload, error: res.__(resPayload), message: res.__(resPayload), data: {} });
      }

      const { statusCode = 400, message = 'BAD_REQUEST', data = {} } = resPayload;

      return res.status(statusCode).send({ statusCode, status: message, message: res.__(message), error: res.__(message), data });
    };

    res.internalServerError = (e) => {
      logger(e);

      return res.status(500).send({ statusCode: 500, status: 'SOME_ERROR_OCCURRED', message: res.__('SOME_ERROR_OCCURRED'), error: res.__('SOME_ERROR_OCCURRED'), data: {} });
    };

    res.unauthorized = (message = '') => {
      logger(message);

      return res.status(401).send({ statusCode: 401, status: message, message: res.__(message), data: {}, error: res.__('UNAUTHORIZED') });
    };

    res.forbidden = () => {
      return res.status(403).send({ statusCode: 403, status: 'FORBIDDEN', message: res.__('FORBIDDEN'), data: {}, error: res.__('FORBIDDEN') });
    };

    next();
  };
}
