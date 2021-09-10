export default `
products {
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
    }
    attributeValues {
      id
    }
  }
`;
