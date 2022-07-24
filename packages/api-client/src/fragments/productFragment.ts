export default `
  id
  firstVariant
  smallImage
  price
  name
  description
  image
  imageFilename
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
