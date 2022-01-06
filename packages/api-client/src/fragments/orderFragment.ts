export default `
order {
  id
  name
  amountTotal
  amountTax
  amountDelivery
  dateOrder
  orderUrl
  stage
  websiteOrderLine {
    id
    name
    product {
      id
      name
      image
      image
      displayName
    }
    quantity
    priceTotal
  }
  orderLines {
    id
    name
    product {
      id
      name
      image
      image
      displayName
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
