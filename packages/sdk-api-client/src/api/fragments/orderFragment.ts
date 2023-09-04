export default `
order {
  id
  name
  amountTotal
  amountTax    
  amountDelivery
  amountDiscounts
  dateOrder
  orderUrl
  stage
  coupons {
    code
    id
  }
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
      attributeValues {
        id,
        name,
        displayType,
        htmlColor        
      }
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
