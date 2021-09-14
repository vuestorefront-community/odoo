export default `
order {
  name
  amountTotal
  amountTax
  orderLines {
    id
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
