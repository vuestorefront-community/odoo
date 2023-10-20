/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: { input: any; output: any; }
};

export type AddAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  countryId: Scalars['Int']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  stateId?: InputMaybe<Scalars['Int']['input']>;
  street: Scalars['String']['input'];
  street2?: InputMaybe<Scalars['String']['input']>;
  zip: Scalars['String']['input'];
};

export enum AddressEnum {
  Billing = 'Billing',
  Shipping = 'Shipping'
}

export type AddressFilterInput = {
  addressType?: InputMaybe<Array<InputMaybe<AddressEnum>>>;
};

/** An enumeration. */
export enum AddressType {
  Contact = 'Contact',
  DeliveryAddress = 'DeliveryAddress',
  InvoiceAddress = 'InvoiceAddress',
  OtherAddress = 'OtherAddress',
  PrivateAddress = 'PrivateAddress'
}

export type AdyenAcquirerInfoResult = {
  __typename?: 'AdyenAcquirerInfoResult';
  adyenAcquirerInfo?: Maybe<Scalars['GenericScalar']['output']>;
};

export type AdyenPaymentDetailsResult = {
  __typename?: 'AdyenPaymentDetailsResult';
  adyenPaymentDetails?: Maybe<Scalars['GenericScalar']['output']>;
};

export type AdyenPaymentMethodsResult = {
  __typename?: 'AdyenPaymentMethodsResult';
  adyenPaymentMethods?: Maybe<Scalars['GenericScalar']['output']>;
};

export type AdyenPaymentsResult = {
  __typename?: 'AdyenPaymentsResult';
  adyenPayments?: Maybe<Scalars['GenericScalar']['output']>;
};

export type AdyenTransactionResult = {
  __typename?: 'AdyenTransactionResult';
  transaction?: Maybe<Scalars['GenericScalar']['output']>;
};

export type ApplyCoupon = {
  __typename?: 'ApplyCoupon';
  error?: Maybe<Scalars['String']['output']>;
};

export type ApplyGiftCard = {
  __typename?: 'ApplyGiftCard';
  error?: Maybe<Scalars['String']['output']>;
};

export type Attribute = {
  __typename?: 'Attribute';
  displayType?: Maybe<Scalars['String']['output']>;
  filterVisibility?: Maybe<FilterVisibility>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<AttributeValue>>;
  variantCreateMode?: Maybe<VariantCreateMode>;
};

export type AttributeValue = {
  __typename?: 'AttributeValue';
  attribute?: Maybe<Attribute>;
  displayType?: Maybe<Scalars['String']['output']>;
  htmlColor?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** Not use in the return Attributes List of the Products Query */
  priceExtra?: Maybe<Scalars['Float']['output']>;
  search?: Maybe<Scalars['String']['output']>;
};

export type BlogBlog = {
  __typename?: 'BlogBlog';
  blogPostCount?: Maybe<Scalars['Int']['output']>;
  blogPosts?: Maybe<Array<BlogPost>>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Website>;
  websiteSlug?: Maybe<Scalars['String']['output']>;
};

export type BlogImage = {
  __typename?: 'BlogImage';
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  post?: Maybe<BlogPost>;
  sequence?: Maybe<Scalars['Int']['output']>;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  author?: Maybe<Partner>;
  authorImage?: Maybe<Scalars['String']['output']>;
  authorName?: Maybe<Scalars['String']['output']>;
  blog?: Maybe<BlogBlog>;
  content?: Maybe<Scalars['String']['output']>;
  createDate?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<User>;
  id: Scalars['Int']['output'];
  images?: Maybe<Array<BlogImage>>;
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  isSeoOptimized?: Maybe<Scalars['Boolean']['output']>;
  lastContributor?: Maybe<User>;
  lastUpdateOn?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  publishedDate?: Maybe<Scalars['String']['output']>;
  publishingDate?: Maybe<Scalars['String']['output']>;
  seoName?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<BlogTag>>;
  teaser?: Maybe<Scalars['String']['output']>;
  teaserManual?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Website>;
  websiteMetaDescription?: Maybe<Scalars['String']['output']>;
  websiteMetaKeywords?: Maybe<Scalars['String']['output']>;
  websiteMetaOgImg?: Maybe<Scalars['String']['output']>;
  websiteMetaTitle?: Maybe<Scalars['String']['output']>;
  websiteSlug?: Maybe<Scalars['String']['output']>;
};

export type BlogPostFilterInput = {
  id?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  websiteSlug?: InputMaybe<Scalars['String']['input']>;
};

export type BlogPostList = BlogPosts & {
  __typename?: 'BlogPostList';
  blogPosts?: Maybe<Array<Maybe<BlogPost>>>;
  totalCount: Scalars['Int']['output'];
};

export type BlogPostSortInput = {
  id?: InputMaybe<SortEnum>;
};

export type BlogPosts = {
  blogPosts?: Maybe<Array<Maybe<BlogPost>>>;
  totalCount: Scalars['Int']['output'];
};

export type BlogTag = {
  __typename?: 'BlogTag';
  category?: Maybe<BlogTagCategory>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<BlogPost>>;
};

export type BlogTagCategories = {
  blogTagCategories?: Maybe<Array<Maybe<BlogTagCategory>>>;
  totalCount: Scalars['Int']['output'];
};

export type BlogTagCategory = {
  __typename?: 'BlogTagCategory';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<BlogTag>>;
};

export type BlogTagCategoryFilterInput = {
  id?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type BlogTagCategoryList = BlogTagCategories & {
  __typename?: 'BlogTagCategoryList';
  blogTagCategories?: Maybe<Array<Maybe<BlogTagCategory>>>;
  totalCount: Scalars['Int']['output'];
};

export type BlogTagCategorySortInput = {
  id?: InputMaybe<SortEnum>;
};

export type BlogTagFilterInput = {
  id?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type BlogTagList = BlogTags & {
  __typename?: 'BlogTagList';
  blogTags?: Maybe<Array<Maybe<BlogTag>>>;
  totalCount: Scalars['Int']['output'];
};

export type BlogTagSortInput = {
  id?: InputMaybe<SortEnum>;
};

export type BlogTags = {
  blogTags?: Maybe<Array<Maybe<BlogTag>>>;
  totalCount: Scalars['Int']['output'];
};

export type Cart = {
  order?: Maybe<Order>;
};

export type CartData = Cart & {
  __typename?: 'CartData';
  order?: Maybe<Order>;
};

export type CartLineInput = {
  id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type Categories = {
  categories?: Maybe<Array<Maybe<Category>>>;
  totalCount: Scalars['Int']['output'];
};

export type Category = {
  __typename?: 'Category';
  childs?: Maybe<Array<Category>>;
  id: Scalars['Int']['output'];
  jsonLd?: Maybe<Scalars['GenericScalar']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Category>;
  products?: Maybe<Array<Product>>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type CategoryFilterInput = {
  id?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  parent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryList = Categories & {
  __typename?: 'CategoryList';
  categories?: Maybe<Array<Maybe<Category>>>;
  totalCount: Scalars['Int']['output'];
};

export type CategorySortInput = {
  id?: InputMaybe<SortEnum>;
};

export type CmsCollection = {
  __typename?: 'CmsCollection';
  content?: Maybe<Scalars['String']['output']>;
  contentCount?: Maybe<Scalars['Int']['output']>;
  contents?: Maybe<Array<CmsContent>>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Website>;
  websiteSlug?: Maybe<Scalars['String']['output']>;
};

export type CmsCollectionFilterInput = {
  id?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  websiteSlug?: InputMaybe<Scalars['String']['input']>;
};

export type CmsCollectionList = CmsCollections & {
  __typename?: 'CmsCollectionList';
  cmsCollections?: Maybe<Array<Maybe<CmsCollection>>>;
  totalCount: Scalars['Int']['output'];
};

export type CmsCollectionSortInput = {
  id?: InputMaybe<SortEnum>;
};

export type CmsCollections = {
  cmsCollections?: Maybe<Array<Maybe<CmsCollection>>>;
  totalCount: Scalars['Int']['output'];
};

export type CmsContent = {
  __typename?: 'CmsContent';
  author?: Maybe<Partner>;
  authorImage?: Maybe<Scalars['String']['output']>;
  authorName?: Maybe<Scalars['String']['output']>;
  collection?: Maybe<CmsCollection>;
  content?: Maybe<Scalars['String']['output']>;
  createDate?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<User>;
  id: Scalars['Int']['output'];
  images?: Maybe<Array<CmsImage>>;
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  isSeoOptimized?: Maybe<Scalars['Boolean']['output']>;
  lastContributor?: Maybe<User>;
  lastUpdateOn?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  publishedDate?: Maybe<Scalars['String']['output']>;
  publishingDate?: Maybe<Scalars['String']['output']>;
  seoName?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  teaser?: Maybe<Scalars['String']['output']>;
  teaserManual?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Website>;
  websiteMetaDescription?: Maybe<Scalars['String']['output']>;
  websiteMetaKeywords?: Maybe<Scalars['String']['output']>;
  websiteMetaOgImg?: Maybe<Scalars['String']['output']>;
  websiteMetaTitle?: Maybe<Scalars['String']['output']>;
  websiteSlug?: Maybe<Scalars['String']['output']>;
};

export type CmsContentFilterInput = {
  id?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  websiteSlug?: InputMaybe<Scalars['String']['input']>;
};

export type CmsContentList = CmsContents & {
  __typename?: 'CmsContentList';
  cmsContents?: Maybe<Array<Maybe<CmsContent>>>;
  totalCount: Scalars['Int']['output'];
};

export type CmsContentSortInput = {
  id?: InputMaybe<SortEnum>;
};

export type CmsContents = {
  cmsContents?: Maybe<Array<Maybe<CmsContent>>>;
  totalCount: Scalars['Int']['output'];
};

export type CmsImage = {
  __typename?: 'CmsImage';
  content?: Maybe<CmsContent>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sequence?: Maybe<Scalars['Int']['output']>;
};

export type Company = {
  __typename?: 'Company';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  socialFacebook?: Maybe<Scalars['String']['output']>;
  socialGithub?: Maybe<Scalars['String']['output']>;
  socialInstagram?: Maybe<Scalars['String']['output']>;
  socialLinkedin?: Maybe<Scalars['String']['output']>;
  socialTwitter?: Maybe<Scalars['String']['output']>;
  socialYoutube?: Maybe<Scalars['String']['output']>;
  state?: Maybe<State>;
  street?: Maybe<Scalars['String']['output']>;
  street2?: Maybe<Scalars['String']['output']>;
  vat?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type ContactUsParams = {
  company?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};

export type Countries = {
  countries?: Maybe<Array<Maybe<Country>>>;
  totalCount: Scalars['Int']['output'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  states?: Maybe<Array<State>>;
};

export type CountryFilterInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryList = Countries & {
  __typename?: 'CountryList';
  countries?: Maybe<Array<Maybe<Country>>>;
  totalCount: Scalars['Int']['output'];
};

export type CountrySortInput = {
  id?: InputMaybe<SortEnum>;
};

export type Coupon = {
  __typename?: 'Coupon';
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
};

export type Currency = {
  __typename?: 'Currency';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type DeleteAddress = {
  __typename?: 'DeleteAddress';
  result?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteAddressInput = {
  id: Scalars['Int']['input'];
};

/** An enumeration. */
export enum FilterVisibility {
  Hidden = 'Hidden',
  Visible = 'Visible'
}

export type GiftCard = {
  __typename?: 'GiftCard';
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
};

export type Invoice = {
  __typename?: 'Invoice';
  amountResidual?: Maybe<Scalars['Float']['output']>;
  amountTax?: Maybe<Scalars['Float']['output']>;
  amountTotal?: Maybe<Scalars['Float']['output']>;
  amountUntaxed?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Currency>;
  id: Scalars['Int']['output'];
  invoiceDate?: Maybe<Scalars['String']['output']>;
  invoiceDateDue?: Maybe<Scalars['String']['output']>;
  invoiceLines?: Maybe<Array<InvoiceLine>>;
  invoiceUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  partner?: Maybe<Partner>;
  partnerShipping?: Maybe<Partner>;
  state?: Maybe<InvoiceState>;
  totalsJson?: Maybe<Scalars['GenericScalar']['output']>;
  transactions?: Maybe<Array<PaymentTransaction>>;
};

export type InvoiceLine = {
  __typename?: 'InvoiceLine';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  priceSubtotal?: Maybe<Scalars['Float']['output']>;
  priceTotal?: Maybe<Scalars['Float']['output']>;
  priceUnit?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

export type InvoiceList = Invoices & {
  __typename?: 'InvoiceList';
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  totalCount: Scalars['Int']['output'];
};

export type InvoiceSortInput = {
  id?: InputMaybe<SortEnum>;
  invoiceDate?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  state?: InputMaybe<SortEnum>;
};

/** An enumeration. */
export enum InvoiceState {
  Cancelled = 'Cancelled',
  Draft = 'Draft',
  Posted = 'Posted'
}

/** An enumeration. */
export enum InvoiceStatus {
  FullyInvoiced = 'FullyInvoiced',
  NothingtoInvoice = 'NothingtoInvoice',
  ToInvoice = 'ToInvoice',
  UpsellingOpportunity = 'UpsellingOpportunity'
}

export type Invoices = {
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  totalCount: Scalars['Int']['output'];
};

export type Lead = {
  __typename?: 'Lead';
  company?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
};

export type MailingContact = {
  __typename?: 'MailingContact';
  companyName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  subscriptionList?: Maybe<Array<MailingContactSubscription>>;
};

export type MailingContactFilterInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type MailingContactList = MailingContacts & {
  __typename?: 'MailingContactList';
  mailingContacts?: Maybe<Array<Maybe<MailingContact>>>;
  totalCount: Scalars['Int']['output'];
};

export type MailingContactSortInput = {
  id?: InputMaybe<SortEnum>;
};

export type MailingContactSubscription = {
  __typename?: 'MailingContactSubscription';
  id: Scalars['Int']['output'];
  mailingList?: Maybe<MailingList>;
  optOut?: Maybe<Scalars['Boolean']['output']>;
};

export type MailingContacts = {
  mailingContacts?: Maybe<Array<Maybe<MailingContact>>>;
  totalCount: Scalars['Int']['output'];
};

export type MailingInput = {
  mailinglistId: Scalars['Int']['input'];
  optout: Scalars['Boolean']['input'];
};

export type MailingList = {
  __typename?: 'MailingList';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type MailingListFilterInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type MailingListList = MailingLists & {
  __typename?: 'MailingListList';
  mailingLists?: Maybe<Array<Maybe<MailingList>>>;
  totalCount: Scalars['Int']['output'];
};

export type MailingListSortInput = {
  id?: InputMaybe<SortEnum>;
};

export type MailingLists = {
  mailingLists?: Maybe<Array<Maybe<MailingList>>>;
  totalCount: Scalars['Int']['output'];
};

export type MakeGiftCardPayment = {
  __typename?: 'MakeGiftCardPayment';
  done?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add new billing or shipping address and set it on the shopping cart. */
  addAddress?: Maybe<Partner>;
  /** Get Adyen Acquirer Info. */
  adyenAcquirerInfo?: Maybe<AdyenAcquirerInfoResult>;
  /** Submit the Adyen Payment Details. */
  adyenPaymentDetails?: Maybe<AdyenPaymentDetailsResult>;
  /** Get Adyen Payment Methods. */
  adyenPaymentMethods?: Maybe<AdyenPaymentMethodsResult>;
  /** Make Adyen Payment request. */
  adyenPayments?: Maybe<AdyenPaymentsResult>;
  /** Create Adyen Transaction */
  adyenTransaction?: Maybe<AdyenTransactionResult>;
  /** Apply Coupon */
  applyCoupon?: Maybe<ApplyCoupon>;
  /** Apply Gift Card */
  applyGiftCard?: Maybe<ApplyGiftCard>;
  /** Add Item */
  cartAddItem?: Maybe<CartData>;
  /** Add Multiple Items */
  cartAddMultipleItems?: Maybe<CartData>;
  /** Cart Clear */
  cartClear?: Maybe<Order>;
  /** Remove Item */
  cartRemoveItem?: Maybe<CartData>;
  /** Remove Multiple Items */
  cartRemoveMultipleItems?: Maybe<CartData>;
  /** Update Item */
  cartUpdateItem?: Maybe<CartData>;
  /** Update Multiple Items */
  cartUpdateMultipleItems?: Maybe<CartData>;
  /** Set new user's password with the token from the change password url received in the email. */
  changePassword?: Maybe<User>;
  /** Creates a new lead with the contact information. */
  contactUs?: Maybe<Lead>;
  /** Create or update a partner for guest checkout */
  createUpdatePartner?: Maybe<Partner>;
  /** Delete a billing or shipping address. */
  deleteAddress?: Maybe<DeleteAddress>;
  /** Authenticate user with email and password and retrieves token. */
  login?: Maybe<User>;
  /** Logout user */
  logout?: Maybe<Scalars['Boolean']['output']>;
  /** Pay the order only with gift card. */
  makeGiftCardPayment?: Maybe<MakeGiftCardPayment>;
  /** Subscribe to newsletter. */
  newsletterSubscribe?: Maybe<NewsletterSubscribe>;
  /** Register a new user with email, name and password. */
  register?: Maybe<User>;
  /** Send change password url to user's email. */
  resetPassword?: Maybe<User>;
  /** Select a billing or shipping address to be used on the shopping cart. */
  selectAddress?: Maybe<Partner>;
  /** Set Shipping Method on Cart */
  setShippingMethod?: Maybe<CartData>;
  /** Update a billing or shipping address and set it on the shopping cart. */
  updateAddress?: Maybe<Partner>;
  /** Update MyAccount */
  updateMyAccount?: Maybe<Partner>;
  /** Update user password. */
  updatePassword?: Maybe<User>;
  /** Create or Update Multiple Mailing Contact information */
  userAddMultipleMailing?: Maybe<MailingContact>;
  /** Add Item */
  wishlistAddItem?: Maybe<WishlistData>;
  /** Remove Item */
  wishlistRemoveItem?: Maybe<WishlistData>;
};


export type MutationAddAddressArgs = {
  address?: InputMaybe<AddAddressInput>;
  type: AddressEnum;
};


export type MutationAdyenAcquirerInfoArgs = {
  acquirerId: Scalars['Int']['input'];
};


export type MutationAdyenPaymentDetailsArgs = {
  acquirerId: Scalars['Int']['input'];
  paymentDetails: Scalars['GenericScalar']['input'];
  transactionReference: Scalars['String']['input'];
};


export type MutationAdyenPaymentMethodsArgs = {
  acquirerId: Scalars['Int']['input'];
};


export type MutationAdyenPaymentsArgs = {
  accessToken: Scalars['String']['input'];
  acquirerId: Scalars['Int']['input'];
  browserInfo: Scalars['GenericScalar']['input'];
  paymentMethod: Scalars['GenericScalar']['input'];
  transactionReference: Scalars['String']['input'];
};


export type MutationAdyenTransactionArgs = {
  acquirerId: Scalars['Int']['input'];
};


export type MutationApplyCouponArgs = {
  promo?: InputMaybe<Scalars['String']['input']>;
};


export type MutationApplyGiftCardArgs = {
  promo?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCartAddItemArgs = {
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartAddMultipleItemsArgs = {
  products?: Array<InputMaybe<ProductInput>>;
};


export type MutationCartRemoveItemArgs = {
  lineId: Scalars['Int']['input'];
};


export type MutationCartRemoveMultipleItemsArgs = {
  lineIds: Array<InputMaybe<Scalars['Int']['input']>>;
};


export type MutationCartUpdateItemArgs = {
  lineId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartUpdateMultipleItemsArgs = {
  lines?: Array<InputMaybe<CartLineInput>>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationContactUsArgs = {
  contactus?: InputMaybe<ContactUsParams>;
};


export type MutationCreateUpdatePartnerArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subscribeNewsletter: Scalars['Boolean']['input'];
};


export type MutationDeleteAddressArgs = {
  address?: InputMaybe<DeleteAddressInput>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  subscribeNewsletter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationNewsletterSubscribeArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  subscribeNewsletter?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationSelectAddressArgs = {
  address?: InputMaybe<SelectAddressInput>;
  type: AddressEnum;
};


export type MutationSetShippingMethodArgs = {
  shippingMethodId: Scalars['Int']['input'];
};


export type MutationUpdateAddressArgs = {
  address: UpdateAddressInput;
};


export type MutationUpdateMyAccountArgs = {
  myaccount?: InputMaybe<UpdateMyAccountParams>;
};


export type MutationUpdatePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationUserAddMultipleMailingArgs = {
  mailings?: Array<InputMaybe<MailingInput>>;
};


export type MutationWishlistAddItemArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationWishlistRemoveItemArgs = {
  wishId: Scalars['Int']['input'];
};

export type NewsletterSubscribe = {
  __typename?: 'NewsletterSubscribe';
  subscribed?: Maybe<Scalars['Boolean']['output']>;
};

export type Order = {
  __typename?: 'Order';
  amountDelivery?: Maybe<Scalars['Float']['output']>;
  amountDiscounts?: Maybe<Scalars['Float']['output']>;
  amountGiftCards?: Maybe<Scalars['Float']['output']>;
  amountSubtotal?: Maybe<Scalars['Float']['output']>;
  amountTax?: Maybe<Scalars['Float']['output']>;
  amountTotal?: Maybe<Scalars['Float']['output']>;
  amountUntaxed?: Maybe<Scalars['Float']['output']>;
  cartQuantity?: Maybe<Scalars['Int']['output']>;
  clientOrderRef?: Maybe<Scalars['String']['output']>;
  coupons?: Maybe<Array<Coupon>>;
  currency?: Maybe<Currency>;
  currencyRate?: Maybe<Scalars['String']['output']>;
  dateOrder?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  invoiceCount?: Maybe<Scalars['Int']['output']>;
  invoiceStatus?: Maybe<InvoiceStatus>;
  invoicesUrl?: Maybe<Scalars['String']['output']>;
  lastTransaction?: Maybe<PaymentTransaction>;
  name?: Maybe<Scalars['String']['output']>;
  orderLines?: Maybe<Array<OrderLine>>;
  orderUrl?: Maybe<Scalars['String']['output']>;
  partner?: Maybe<Partner>;
  partnerInvoice?: Maybe<Partner>;
  partnerShipping?: Maybe<Partner>;
  shippingMethod?: Maybe<ShippingMethod>;
  stage?: Maybe<OrderStage>;
  totalsJson?: Maybe<Scalars['GenericScalar']['output']>;
  transactions?: Maybe<Array<PaymentTransaction>>;
  websiteOrderLine?: Maybe<Array<OrderLine>>;
};

export type OrderFilterInput = {
  invoiceStatus?: InputMaybe<Array<InputMaybe<InvoiceStatus>>>;
  stages?: InputMaybe<Array<InputMaybe<OrderStage>>>;
};

export type OrderLine = {
  __typename?: 'OrderLine';
  coupon?: Maybe<Coupon>;
  giftCard?: Maybe<GiftCard>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  priceSubtotal?: Maybe<Scalars['Float']['output']>;
  priceTax?: Maybe<Scalars['Float']['output']>;
  priceTotal?: Maybe<Scalars['Float']['output']>;
  priceUnit?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Float']['output']>;
  warningStock?: Maybe<Scalars['String']['output']>;
};

export type OrderList = Orders & {
  __typename?: 'OrderList';
  orders?: Maybe<Array<Maybe<Order>>>;
  totalCount: Scalars['Int']['output'];
};

export type OrderSortInput = {
  dateOrder?: InputMaybe<SortEnum>;
  id?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  state?: InputMaybe<SortEnum>;
};

/** An enumeration. */
export enum OrderStage {
  Cancelled = 'Cancelled',
  Locked = 'Locked',
  Quotation = 'Quotation',
  QuotationSent = 'QuotationSent',
  SalesOrder = 'SalesOrder'
}

export type Orders = {
  orders?: Maybe<Array<Maybe<Order>>>;
  totalCount: Scalars['Int']['output'];
};

/** An enumeration. */
export enum PageType {
  ProductsPage = 'ProductsPage',
  StaticPage = 'StaticPage'
}

export enum PageTypeEnum {
  Products = 'Products',
  Static = 'Static'
}

export type Partner = {
  __typename?: 'Partner';
  addressType?: Maybe<AddressType>;
  billingAddress?: Maybe<Partner>;
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Partner>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyRegNo?: Maybe<Scalars['String']['output']>;
  contacts?: Maybe<Array<Partner>>;
  country?: Maybe<Country>;
  currentPricelist?: Maybe<Pricelist>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isCompany: Scalars['Boolean']['output'];
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Partner>;
  phone?: Maybe<Scalars['String']['output']>;
  publicPricelist?: Maybe<Pricelist>;
  signupToken?: Maybe<Scalars['String']['output']>;
  signupValid?: Maybe<Scalars['String']['output']>;
  state?: Maybe<State>;
  street?: Maybe<Scalars['String']['output']>;
  street2?: Maybe<Scalars['String']['output']>;
  vat?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  paymentReference?: Maybe<Scalars['String']['output']>;
};

export type PaymentAcquirer = {
  __typename?: 'PaymentAcquirer';
  displayAs?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  paymentIcons?: Maybe<Array<PaymentIcon>>;
  provider?: Maybe<Scalars['String']['output']>;
};

export type PaymentIcon = {
  __typename?: 'PaymentIcon';
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type PaymentTransaction = {
  __typename?: 'PaymentTransaction';
  acquirer?: Maybe<Scalars['String']['output']>;
  acquirerReference?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  company?: Maybe<Partner>;
  currency?: Maybe<Currency>;
  customer?: Maybe<Partner>;
  id?: Maybe<Scalars['Int']['output']>;
  payment?: Maybe<Payment>;
  reference?: Maybe<Scalars['String']['output']>;
  state?: Maybe<PaymentTransactionState>;
};

/** An enumeration. */
export enum PaymentTransactionState {
  Authorized = 'Authorized',
  Canceled = 'Canceled',
  Confirmed = 'Confirmed',
  Draft = 'Draft',
  Error = 'Error',
  Pending = 'Pending'
}

export type Pricelist = {
  __typename?: 'Pricelist';
  currency?: Maybe<Currency>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  accessoryProducts?: Maybe<Array<Product>>;
  allowOutOfStock?: Maybe<Scalars['Boolean']['output']>;
  alternativeProducts?: Maybe<Array<Product>>;
  /** Specific to Product Template */
  attributeValues?: Maybe<Array<AttributeValue>>;
  barcode?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Category>>;
  /** Specific to Product Template */
  combinationInfo?: Maybe<Scalars['GenericScalar']['output']>;
  /** Specific to Product Variant */
  combinationInfoVariant?: Maybe<Scalars['GenericScalar']['output']>;
  currency?: Maybe<Currency>;
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  /** Specific to use in Product Template */
  firstVariant?: Maybe<Product>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  imageFilename?: Maybe<Scalars['String']['output']>;
  isInStock?: Maybe<Scalars['Boolean']['output']>;
  isInWishlist?: Maybe<Scalars['Boolean']['output']>;
  /** Specific to Product Variant */
  isVariantPossible?: Maybe<Scalars['Boolean']['output']>;
  jsonLd?: Maybe<Scalars['GenericScalar']['output']>;
  mediaGallery?: Maybe<Array<ProductImage>>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaKeyword?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  outOfStockMessage?: Maybe<Scalars['String']['output']>;
  /** Specific to Product Template */
  price?: Maybe<Scalars['Float']['output']>;
  /** Specific to Product Variant */
  productTemplate?: Maybe<Product>;
  /** Specific to Product Template */
  productVariants?: Maybe<Array<Product>>;
  qty?: Maybe<Scalars['Float']['output']>;
  ribbon?: Maybe<Ribbon>;
  showAvailableQty?: Maybe<Scalars['Boolean']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  smallImage?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  typeId?: Maybe<Scalars['String']['output']>;
  /** Specific to Product Variant */
  variantAttributeValues?: Maybe<Array<AttributeValue>>;
  /** Specific to Product Variant */
  variantHasDiscountedPrice?: Maybe<Scalars['Boolean']['output']>;
  /** Specific to Product Variant */
  variantPrice?: Maybe<Scalars['Float']['output']>;
  /** Specific to Product Variant */
  variantPriceAfterDiscount?: Maybe<Scalars['Float']['output']>;
  visibility?: Maybe<Scalars['Int']['output']>;
  vsfPages?: Maybe<Array<WebsitePage>>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type ProductFilterInput = {
  attribValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  attributeValueId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  categoryId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  categorySlug?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pageSlug?: InputMaybe<Scalars['String']['input']>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  imageFilename?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['String']['output']>;
};

export type ProductInput = {
  id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type ProductList = Products & {
  __typename?: 'ProductList';
  attributeValues?: Maybe<Array<Maybe<AttributeValue>>>;
  maxPrice?: Maybe<Scalars['Float']['output']>;
  minPrice?: Maybe<Scalars['Float']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  totalCount: Scalars['Int']['output'];
};

export type ProductSortInput = {
  id?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  price?: InputMaybe<SortEnum>;
};

export type ProductVariant = {
  displayImage?: Maybe<Scalars['Boolean']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasDiscountedPrice?: Maybe<Scalars['Boolean']['output']>;
  isCombinationPossible?: Maybe<Scalars['Boolean']['output']>;
  listPrice?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  productTemplateId?: Maybe<Scalars['Int']['output']>;
};

export type ProductVariantData = ProductVariant & {
  __typename?: 'ProductVariantData';
  displayImage?: Maybe<Scalars['Boolean']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  hasDiscountedPrice?: Maybe<Scalars['Boolean']['output']>;
  isCombinationPossible?: Maybe<Scalars['Boolean']['output']>;
  listPrice?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  productTemplateId?: Maybe<Scalars['Int']['output']>;
};

export type Products = {
  attributeValues?: Maybe<Array<Maybe<AttributeValue>>>;
  maxPrice?: Maybe<Scalars['Float']['output']>;
  minPrice?: Maybe<Scalars['Float']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  addresses?: Maybe<Array<Partner>>;
  attribute: Attribute;
  blogPost?: Maybe<BlogPost>;
  blogPosts?: Maybe<BlogPosts>;
  blogTag?: Maybe<BlogTag>;
  blogTagCategories?: Maybe<BlogTagCategories>;
  blogTagCategory?: Maybe<BlogTagCategory>;
  blogTags?: Maybe<BlogTags>;
  cart?: Maybe<Cart>;
  categories?: Maybe<Categories>;
  category?: Maybe<Category>;
  cmsCollection?: Maybe<CmsCollection>;
  cmsCollections?: Maybe<CmsCollections>;
  cmsContent?: Maybe<CmsContent>;
  cmsContents?: Maybe<CmsContents>;
  countries?: Maybe<Countries>;
  country: Country;
  deliveryMethods?: Maybe<Array<ShippingMethod>>;
  invoice: Invoice;
  invoices?: Maybe<Invoices>;
  mailingContacts?: Maybe<MailingContacts>;
  mailingList: MailingList;
  mailingLists?: Maybe<MailingLists>;
  order: Order;
  orders?: Maybe<Orders>;
  partner: Partner;
  paymentAcquirer: PaymentAcquirer;
  paymentAcquirers?: Maybe<Array<PaymentAcquirer>>;
  paymentConfirmation?: Maybe<Cart>;
  paymentTransaction: PaymentTransaction;
  product?: Maybe<Product>;
  productVariant: ProductVariant;
  products?: Maybe<Products>;
  websiteFooter?: Maybe<Array<WebsiteMenu>>;
  websiteMegaMenu?: Maybe<Array<WebsiteMenu>>;
  websiteMenu?: Maybe<Array<WebsiteMenu>>;
  websitePage?: Maybe<WebsitePage>;
  websitePages?: Maybe<WebsitePages>;
  wishlistItems?: Maybe<WishlistData>;
};


export type QueryAddressesArgs = {
  filter?: InputMaybe<AddressFilterInput>;
};


export type QueryAttributeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBlogPostArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  websiteSlug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBlogPostsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<BlogPostFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<BlogPostSortInput>;
};


export type QueryBlogTagArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBlogTagCategoriesArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<BlogTagCategoryFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<BlogTagCategorySortInput>;
};


export type QueryBlogTagCategoryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBlogTagsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<BlogTagFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<BlogTagSortInput>;
};


export type QueryCategoriesArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CategoryFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<CategorySortInput>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCmsCollectionArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  websiteSlug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCmsCollectionsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CmsCollectionFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<CmsCollectionSortInput>;
};


export type QueryCmsContentArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  websiteSlug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCmsContentsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CmsContentFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<CmsContentSortInput>;
};


export type QueryCountriesArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CountryFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<CountrySortInput>;
};


export type QueryCountryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInvoiceArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInvoicesArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<InvoiceSortInput>;
};


export type QueryMailingContactsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<MailingContactFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<MailingContactSortInput>;
};


export type QueryMailingListArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMailingListsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<MailingListFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<MailingListSortInput>;
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrdersArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<OrderFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<OrderSortInput>;
};


export type QueryPaymentAcquirerArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPaymentTransactionArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductArgs = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductVariantArgs = {
  combinationId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  productTemplateId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductsArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ProductSortInput>;
};


export type QueryWebsitePageArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  pageSlug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWebsitePagesArgs = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<WebsitePageFilterInput>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<WebsitePageSortInput>;
};

export type Ribbon = {
  __typename?: 'Ribbon';
  bgColor?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  html?: Maybe<Scalars['String']['output']>;
  htmlClass?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  textColor?: Maybe<Scalars['String']['output']>;
};

export type SelectAddressInput = {
  id: Scalars['Int']['input'];
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  imageFilename?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
};

export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type State = {
  __typename?: 'State';
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['Int']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  street2?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyAccountParams = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  partner?: Maybe<Partner>;
};

/** An enumeration. */
export enum VariantCreateMode {
  Dynamically = 'Dynamically',
  Instantly = 'Instantly',
  NeverOption = 'NeverOption'
}

export type Website = {
  __typename?: 'Website';
  company?: Maybe<Company>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type WebsiteMenu = {
  __typename?: 'WebsiteMenu';
  childs?: Maybe<Array<WebsiteMenu>>;
  images?: Maybe<Array<WebsiteMenuImage>>;
  isFooter?: Maybe<Scalars['Boolean']['output']>;
  isMegaMenu?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<WebsiteMenu>;
  sequence?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type WebsiteMenuImage = {
  __typename?: 'WebsiteMenuImage';
  buttonText?: Maybe<Scalars['String']['output']>;
  buttonUrl?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  sequence?: Maybe<Scalars['Int']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  textColor?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type WebsitePage = {
  __typename?: 'WebsitePage';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pageType?: Maybe<PageType>;
  products?: Maybe<Array<Product>>;
  publishingDate?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Website>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export type WebsitePageFilterInput = {
  id?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  pageSlug?: InputMaybe<Scalars['String']['input']>;
  pageType?: InputMaybe<Array<InputMaybe<PageTypeEnum>>>;
};

export type WebsitePageList = WebsitePages & {
  __typename?: 'WebsitePageList';
  totalCount: Scalars['Int']['output'];
  websitePages?: Maybe<Array<Maybe<WebsitePage>>>;
};

export type WebsitePageSortInput = {
  id?: InputMaybe<SortEnum>;
};

export type WebsitePages = {
  totalCount: Scalars['Int']['output'];
  websitePages?: Maybe<Array<Maybe<WebsitePage>>>;
};

export type WishlistData = WishlistItems & {
  __typename?: 'WishlistData';
  totalCount: Scalars['Int']['output'];
  wishlistItems?: Maybe<Array<Maybe<WishlistItem>>>;
};

export type WishlistItem = {
  __typename?: 'WishlistItem';
  id: Scalars['Int']['output'];
  partner?: Maybe<Partner>;
  product?: Maybe<Product>;
};

export type WishlistItems = {
  totalCount: Scalars['Int']['output'];
  wishlistItems?: Maybe<Array<Maybe<WishlistItem>>>;
};
