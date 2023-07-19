import { response } from "express";
import Product from "../models/product.js";
import User from "../models/user.js";

export const getProducts = (req, res, next) => {
    // Product.findAll()
    //     .then(products => {
    //         res.render('shop/product-list', {
    //             prods: products,
    //             pageTitle: 'All Products',
    //             path: '/products'
    //         });
    //     })
    //     .catch(error => console.log(error))

    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(error => console.log(error))
}

export const getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findProductById(productId)
        .then(product => {
            res.render('shop/product-details', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch(error => console.log(error))
}

export const getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(error => console.log(error))
}

export const getCart = (req, res, next) => {

    req.user.getCartItems()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
        })
        .catch(error => console.log(error))
    //     .then(cart => {
    //     res.render('shop/cart', {
    //         path: '/cart',
    //         pageTitle: 'Your Cart',
    //         cart: cart
    //     })
    // })
    // .catch(error => console.log(error))

    // req.user.getCart()
    //     .then(cart => {
    //         return cart.getProducts()
    //             .then(products => {
    //                 res.render('shop/cart', {
    //                     path: '/cart',
    //                     pageTitle: 'Your Cart',
    //                     cart: cart,
    //                     products: products
    //                 })
    //             })
    //     })
    //     .catch(error => console.log(error));
    // Cart.getCart(cart => {
    //     const cartProducts = []
    //     Product.fetchAll(products => {
    //         for (let product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product });
    //                 res.render('shop/cart', {
    //                     path: '/cart',
    //                     pageTitle: 'Your Cart'
    //                 })
    //             }
    //         }
    //     })
    // })
}

export const postCart = (req, res, next) => {
    const productId = req.body.productId;
    // let fetchedCart;
    // let newQuantity = 1;
    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart
    //         return cart.getProducts({ where: { id: productId } })
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }
    //         if (product) {
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //         }
    //         return Product.findByPk(productId)
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, {
    //             through: { quantity: newQuantity }
    //         })
    //     })
    //     .then(() => res.redirect('/cart'))
    //     .catch(error => console.log(error));

    Product.findProductById(productId)
        .then(product => {
            return req.user.addProductToCart(product);
        })
        .then((response) => res.redirect('/cart'))
        .catch(error => console.log(error))
}

export const cartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    req.user.cartDeleteProduct(productId)
        .then(() => res.redirect('/cart'))
        .catch((error) => console.log(error));
}

export const postOrder = (req, res, next) => {
    // let fetchedCart;
    // req.user.getCart()
    //     .then(cart => {
    //         return cart.getProducts();
    //     })
    //     .then(products => {
    //         return req.user.createOrder()
    //             .then(order => {
    //                 order.addProducts(
    //                     products.map(product => {
    //                         product.orderItem = { quantity: product.cartItem.quantity };
    //                         return product;
    //                     })
    //                 )
    //             })
    //             .catch(error => console.log(error));

    //     })
    //     .then(result => {
    //         return fetchedCart.setProducts(null);
    //     })
    //     .then(result => {
    //         res.redirect('/orders');
    //     })
    //     .catch(error => console.log(error));
    req.user.createOrder()
        .then(() => res.redirect('/orders'))
        .catch(error => console.log(error))
}

export const getOrders = (req, res, next) => {
    // req.user.getOrders({ include: ['products'] })
    //     .then(orders => {
    //         res.render('shop/orders', {
    //             path: '/orders',
    //             pageTitle: 'Your Orders',
    //             orders: orders
    //         })
    //     })

    req.user.getOrders()
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            })
        })
        .catch(error => console.log(error))
}