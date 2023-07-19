import { response } from "express";
import Product from "../models/product.js";

export const getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

export const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl, null, req.user._id);

    product.save()
        .then(() => res.redirect('/admin/products'))
        .catch(error => console.log(error))

}

export const getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) return res.redirect('/')
    const productId = req.params.productId;

    Product.findProductById(productId)
        .then(product => {
            res.render('admin/add-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            })
        })
};

export const postEditProducts = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, productId)

    updatedProduct.save()
        .then(() => res.redirect('/admin/products'))
        .catch(error => console.log(error))
};

export const getAdminProducts = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            })
        })
        .catch(error => console.log(error))
}

export const postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.deleteProduct(productId)
        .then(() => res.redirect('/admin/products'))
        .catch(error => console.log(error))
}