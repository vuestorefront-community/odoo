/* eslint-disable no-prototype-builtins */
import { Ref } from '@nuxtjs/composition-api';
import { Context, sharedRef, useVSFContext } from '@vue-storefront/core';

export interface IUseAdyenDropInPayment {
  transaction: Ref<any>;
  acquirerInfo: Ref<any>;
  paymentMethods: Ref<any>;
  openAdyenTransaction: () => any;
  getAdyenAcquirerInfo: () => any;
  getAdyenPaymentMethods: () => any;
  getAdyenPaymentDetails: (params: any) => any;
  adyenMakeDirectPayment: (params: any) => any;
  setTransaction: (transaction: any) => any;
}

const useAdyenDirectPayment = (acquirerId: number, cartId?: number): IUseAdyenDropInPayment => {
  const context: Context = useVSFContext();

  const transaction = sharedRef({}, `transaction-${cartId}`);
  const acquirerInfo = sharedRef({}, `acquirerInfo-${cartId}`);
  const paymentMethods = sharedRef({}, `paymentMethods-${cartId}`);
  const paymentDetails = sharedRef({}, `paymentDetails-${cartId}`);

  const openAdyenTransaction = async() => {
    const { data } = await context.$odoo.api.adyenOpenTransaction({ acquirerId });

    transaction.value = data?.adyenTransaction?.transaction || {};
  };

  const getAdyenAcquirerInfo = async() => {
    const { data } = await context.$odoo.api.adyenAcquirerInfo({ acquirerId });

    acquirerInfo.value = data?.adyenAcquirerInfo?.adyenAcquirerInfo || {};
  };

  const getAdyenPaymentMethods = async() => {
    const { data } = await context.$odoo.api.adyenPaymentMethods({ acquirerId });

    paymentMethods.value = data?.adyenPaymentMethods?.adyenPaymentMethods || {};
  };

  const getAdyenPaymentDetails = async(params: any) => {
    const { data } = await context.$odoo.api.adyenPaymentDetails(params);

    paymentDetails.value = data?.adyenPaymentDetails?.adyenPaymentDetails || {};
  };

  const adyenMakeDirectPayment = async(params: any) => {
    const { data } = await context.$odoo.api.adyenMakeDirectPayment(params);

    return data?.adyenPayments?.adyenPayments || {};
  };

  const setTransaction = (transaction: any) => transaction.value = transaction;

  return {
    getAdyenPaymentMethods,
    paymentMethods,
    transaction,
    acquirerInfo,
    openAdyenTransaction,
    adyenMakeDirectPayment,
    getAdyenAcquirerInfo,
    getAdyenPaymentDetails,
    setTransaction
  };
};

export default useAdyenDirectPayment;
