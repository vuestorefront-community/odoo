======================
Graphql Vue Storefront
======================

Login
=====

To authenticate, use the default /web/session/authenticate endpoint.
Example using axios:

axios.post('<domain>/web/session/authenticate', {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "db": <database_name>,
        "login": <user_login>,
        "password": <user_password>
}}, {
    "withCredentials": true
})

Logout
======

axios.post('<domain>/web/session/destroy', {
    "jsonrpc": "2.0",
    "method": "call"
}, {
    "withCredentials": true
})

Add to Cart
===========

axios.post('<domain>/shop/cart/update_json', {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "product_id": <product_id>,
        "add_qty": <qty>
}}, {
    "withCredentials": true
})

Add to wishlist
===========

axios.post('<domain>/shop/wishlist/add', {
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "product_id": <product_id>,
}}, {
    "withCredentials": true
})

Remove from wishlist
===========

axios.post('<domain>/shop/wishlist/remove/<product_wishlist_id)>', {
    "jsonrpc": "2.0",
    "method": "call"
}, {
    "withCredentials": true
})

