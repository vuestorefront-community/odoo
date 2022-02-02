/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import {
  getFormattedPrice,
  getWishlistItemAttributes,
  getWishlistItemImage,
  getWishlistItemName,
  getWishlistItemPrice,
  getWishlistItemQty,
  getWishlistItemSku,
  getWishlistItems,
  getWishlistShippingPrice,
  getWishlistTotalItems,
  getWishlistTotals
} from '../../../../src/composables/getters/wishlistGetters';
import { mockedWishlist } from '../__mocks__/mockedWishlist';

it('get formated price', () => {
  expect(getFormattedPrice(mockedWishlist.wishlistItems[0].product.price)).toStrictEqual('281.25');
});
it('get item name', () => {
  expect(getWishlistItemName(mockedWishlist.wishlistItems[0])).toStrictEqual('Blazer Michael Kors brown');
});
// it('get item image', () => {
//   expect(getWishlistItemImage(mockedWishlist.wishlistItems[0])).toStrictEqual('https://vsfdemo.labs.odoogap.com/web/image/product.template/36/image_1920');
// });
it('get total wishlist items', () => {
  expect(getWishlistTotalItems(mockedWishlist)).toStrictEqual(2);
});
it('get total wishlist price', () => {
  expect(getWishlistTotals(mockedWishlist)).toStrictEqual({ subtotal: 467.5, total: 467.5});
});
