import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { OdooIntegrationContext } from '..';
import { Product, Category, QueryProductArgs, QueryCountriesArgs, QueryProductsArgs, QueryCategoryArgs, QueryCategoriesArgs, QueryProductVariantArgs, ProductVariant, 
  MutationCartAddItemArgs,
  Order,
  WishlistItem,
  CartData,
  Country,  
  QueryCountryArgs, 
  MailingList,
  QueryMailingListsArgs,
  MutationCartRemoveItemArgs,
  MutationCartUpdateItemArgs,
  WishlistData,
  MutationWishlistAddItemArgs,
  MutationWishlistRemoveItemArgs,  
  QueryOrdersArgs,
  QueryMailingContactsArgs,
  MailingContact,
 } from '../../gql/graphql';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {

  /**
   * Here you can find an example endpoint definition. Based on this example, you should define how your endpoint will look like.
   * This description will appear in the API extractor, so try to document all endpoints added here.
   */
  getProductTemplate(context: OdooIntegrationContext, params: QueryProductArgs, customQuery?: CustomQuery<'getProductTemplate'>): Promise<ApolloQueryResult<{ product: Product }>>;
  getProductTemplateList(context: OdooIntegrationContext, params?: QueryProductsArgs, customQuery?: CustomQuery<'getProductTemplateList'>): Promise<ApolloQueryResult<{ products: { products: Product[] } }>>;
  getProductVariant(context: OdooIntegrationContext, params: QueryProductVariantArgs, customQuery?: CustomQuery<'getProductVariant'>): Promise<ApolloQueryResult<{ product: ProductVariant }>>;

  getCategory(context: OdooIntegrationContext, params: QueryCategoryArgs, customQuery?: CustomQuery<'getCategory'>): Promise<ApolloQueryResult<{ category: Category }>>;
  getCategoryList(context: OdooIntegrationContext, params?: QueryCategoriesArgs, customQuery?: CustomQuery<'getCategoryList'>): Promise<ApolloQueryResult<{ categories: { categories: Category[] } }>>;
  
  cartRemove(context: OdooIntegrationContext, params: MutationCartRemoveItemArgs, customQuery?: CustomQuery<'cartRemove'>): Promise<FetchResult<{ cartRemoveItem: { order: Order } }>>;
  cartAdd(context: OdooIntegrationContext, params: MutationCartAddItemArgs, customQuery?: CustomQuery<'cartAdd'>): Promise<FetchResult<{ cartAddItem: { order: Order } }>>;
  cartUpdate(context: OdooIntegrationContext, params: MutationCartUpdateItemArgs, customQuery?: CustomQuery<'cartUpdate'>): Promise<FetchResult<{ cartUpdateItem: { order: Order } }>>;
  cartLoad(context: OdooIntegrationContext, customQuery?: CustomQuery<'cartLoad'>): Promise<ApolloQueryResult<{ cart: CartData }>>;

  //wishlistRemove(context: OdooIntegrationContext, params: MutationWishlistRemoveItemArgs, customQuery?: CustomQuery<'wishlistRemove'>): Promise<FetchResult<{ wishlistRemoveItem: { wishlistItem: WishlistItem } }>>;
  //wishlistAdd(context: OdooIntegrationContext, params: MutationWishlistAddItemArgs, customQuery?: CustomQuery<'wishlistAdd'>): Promise<FetchResult<{ wishlistAddItem: { wishlistItem: WishlistItem } }>>;
  //wishlistLoad(context: OdooIntegrationContext, customQuery?: CustomQuery<'wishlistLoad'>): Promise<ApolloQueryResult<{ wishlist: WishlistData }>>;
  

  getCountry(context: OdooIntegrationContext, params?: QueryCountryArgs, customQuery?: CustomQuery<'getCountry'>): Promise<ApolloQueryResult<{ country:  Country  }>>;
  getCountryList(context: OdooIntegrationContext, params?: QueryCountriesArgs, customQuery?: CustomQuery<'getCountryList'>): Promise<ApolloQueryResult<{ countries: { countries: Country[] } }>>;

  getMailingLists(context: OdooIntegrationContext, params?: QueryMailingListsArgs, customQuery?: CustomQuery<'getMailingLists'>): Promise<ApolloQueryResult<{ mailingLists: { mailingLists: MailingList[] } }>>;

  getOrders(context: OdooIntegrationContext, params?: QueryOrdersArgs, customQuery?: CustomQuery<'getOrders'>): Promise<ApolloQueryResult<{ orders: { orders: Order[] } }>>;

  getMailingContacts(context: OdooIntegrationContext, params?: QueryMailingContactsArgs, customQuery?: CustomQuery<'getMailingContacts'>): Promise<ApolloQueryResult<{ mailingContacts: { mailingContacts: MailingContact[] } }>>;
  
  
}
