/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiClientExtension } from '@vue-storefront/middleware';
import type { Request, Response } from 'express';
import requestIp from 'request-ip';

const sessionHeaderExtension: ApiClientExtension = {
  name: 'sessionHeaderExtension ',
  hooks: (req: Request, res: Response) => {
    return {
      beforeCreate: ({ configuration }) => {
        const clientIp = requestIp.getClientIp(req);

        return {
          ...configuration,
          sessionAuth: req.headers.cookie,
          requestHost: req.headers.host,
          realIp: clientIp
        };
      },
      beforeCall: ({ configuration, callName, args }) => args,
      afterCall: ({ configuration, callName, response }) => {
        if ((response as any).data.cookie) {
          res.setHeader('Set-cookie', (response as any).data.cookie);
        }
        
        return response;
      }

    };
  }
};

export default sessionHeaderExtension;
