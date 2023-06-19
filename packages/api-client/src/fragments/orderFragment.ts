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
      imageFilename
      displayName
      combinationInfo
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
      imageFilename
      displayName
      combinationInfo
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
  shippingMethod{
    id
    name
    price
  }
}
`;
