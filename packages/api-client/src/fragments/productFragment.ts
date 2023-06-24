export default `
  id
  firstVariant{
    id
    combinationInfoVariant
    slug
    variantAttributeValues{
      id
      name
      attribute{
        id
        name
      }
    }
  }
  smallImage
  price
  name
  description
  image
  imageFilename
  combinationInfo
  slug
  sku
  jsonLd
  isInWishlist
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
