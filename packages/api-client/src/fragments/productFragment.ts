export default `
  id
  firstVariant
  smallImage
  price
  name
  description
  image
  slug
  sku
  isInWishlist
  status
  categories {
    id
    name
    slug
    parent{
      parent{
        id
      }
    }
  }
  attributeValues {
    id
    name
    displayType
    priceExtra
    attribute {
      id
      name
    }
    search
  }
`;
