======================
Graphql Vue Storefront
======================

Login
=====

To authenticate, use the default /web/session/authenticate endpoint.
Example using axios:

axios.post('<domain>/web/session/authenticate', {
    "withCredentials": true,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "db": <database_name>,
        "login": <user_login>,
        "password": <user_password>
}})

Logout
======

axios.post('<domain>/web/session/destroy', {
    "withCredentials": true,
    "jsonrpc": "2.0",
    "method": "call"
})

Add to Cart
===========

axios.post('<domain>/shop/cart/update_json', {
    "withCredentials": true,
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "product_id": <product_id>,
        "add_qty": <qty>
}})
