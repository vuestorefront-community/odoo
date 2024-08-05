# Payment
Each payment type must be wrapped in abstract observer.
The abstract observer is responsable to validate some payment parameters and have
some lifecycle hooks for the payment

``` html
 <abstract-payment-observer v-if="selectedProvider.name">
    <component
      class="py-8"
      @isPaymentReady="isPaymentReady = arguments[0]"
      @providerPaymentHandler="providerPaymentHandler = arguments[0]"
      :provider="selectedProvider"
      :is="getComponentProviderByName(selectedProvider.name)"
    />
  </abstract-payment-observer>
```        


## Adyen external
Oddo will create a dinamic form. We build this form and on click, he send to external adyen new tab. Our **AdyenExternalPaymentProvider** handle all this logic using the user session.
