export default `
wishlistItems {
    id
    product {
      id
      name
      description
      image
      price
      imageFilename
      isInWishlist
      variantAttributeValues{
        id
        name
        attribute{
          id
          name
        }
      }
      firstVariant{
        id
        combinationInfoVariant
      }
      slug
    }
  }
`;
