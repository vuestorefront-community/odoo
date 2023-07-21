/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiClientExtension } from '@vue-storefront/core';
import type { Request, Response } from 'express';
import requestIp from 'request-ip';

const cookieExtension: ApiClientExtension = {
  name: 'cookieExtension',
  hooks: (req: Request, res: Response) => {

    return {
      beforeCreate: ({ configuration }) => {
        const clientIp = requestIp.getClientIp(req);

        return {
          ...configuration,
          auth: req.headers.cookie,
          'resquest-host': req.headers.host,
          'real-ip': clientIp
        };
      },
      beforeCall: ({ configuration, callName, args }) => args,
      afterCall: ({ configuration, callName, response }) => {

        if (response.data.cookie) {
          res.setHeader('Set-cookie', response.data.cookie);
        }

        return response;
      }

    };
  }
};

export default cookieExtension;
