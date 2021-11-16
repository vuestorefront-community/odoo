# Custom Queries

## Features
From [VSF2 docs](https://docs.vuestorefront.io/v2/advanced/extending-graphql-queries.html),
we can use custom query on existing APIS.
Most of the apis use 'customQuery' index.
### Use Cart

### Use Category

### Use CountrySearch

### Use Facet
- getProductTemplatesList
``` ts
 await search({ 
   ...uiHelper.getFacetsFromURL(),
   customQueryProducts: {
      getProductTemplatesList: 'customProductTempalteListCategory',
   },
   customQueryCategories: {
      getCategory: 'customCategoryQuery',
   }
});
```
### Use Password

### Use Product
- getProductTemplate
``` ts
 await search({
   id,
   customQuery: { getProductTemplate: 'customProductTemplateQuery' },
 });
```
### Use ProductVariant

### Use Shipping

### Use User
- signUpUser
``` ts
  await register({
    user: form.value,
    customQuery: { signUpUser: 'customSignUpUserMutation' },
  });
```

### Use User Billing

### Use Wishlist

### Use Order
- ordersGet
``` ts
  await search({ customQuery: { ordersGet: 'customOrdersGetQuery' } });
```

