/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const throwErrors = (errors: any) : void=> {
  if (errors?.response.data?.networkError) {
    const errorList = errors.response.data?.networkError?.result?.errors || [];
    throw new Error(errorList.map(error => error.message).join(',') || 'Some error');
  }
  if (errors?.response.data?.graphQLErrors) {
    const errorList = errors.response.data?.graphQLErrors || [];
    throw new Error(errorList.map(error => error.message).join(',') || 'Some error');
  }
};

export {
  throwErrors
};
