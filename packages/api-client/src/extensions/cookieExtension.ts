/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiClientExtension } from '@vue-storefront/core';
import type { Request, Response } from 'express';

const cookieExtension: ApiClientExtension = {
  name: 'cookieExtension',
  hooks: (req: Request, res: Response) => {

    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        auth: req.headers.cookie
      }),
      beforeCall: ({ configuration, callName, args }) => {
        res.setHeader('host', req.headers.host);
        return args;
      },
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
