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
      firstVariant{
        id
        combinationInfoVariant
      }
      slug
    }
  }
`;
