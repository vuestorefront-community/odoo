export default `
order {
  name
  amountTotal
  amountTax
  amountDelivery
  orderLines {
    id
    name
    product {
      id
      name
      image
      variantImage
    }
    quantity
    priceTotal
  }
  partnerInvoice {
    id
    name
    street
    city
    phone
    zip
    country {
      id
    }
    state {
      id
    }
  }
  partnerShipping {
    id
    name
    street
    city
    phone
    zip
    country {
      id
    }
    state { 
      id
    }
  }
}
`;
