"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getSingleProduct = exports.getProduct = void 0;
const utilis_1 = require("../utilis");
const productModel_1 = require("../models/productModel");
async function getProduct(req, res) {
    try {
        const products = await productModel_1.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
    }
    catch (error) {
        res.end("Unable to retreive products from database");
    }
}
exports.getProduct = getProduct;
async function getSingleProduct(req, res, id) {
    try {
        const product = await productModel_1.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.getSingleProduct = getSingleProduct;
async function createProduct(req, res) {
    try {
        const body = (await utilis_1.getData(req));
        const { productName, productDescription, productVarieties } = JSON.parse(body);
        const product = {
            productName,
            productDescription,
            productVarieties,
            dateUploaded: new Date().toISOString(),
            dateEdited: new Date().toISOString()
        };
        const newProduct = await productModel_1.create(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newProduct));
    }
    catch (error) {
        console.log(error);
    }
}
exports.createProduct = createProduct;
async function updateProduct(req, res, id) {
    try {
        const product = await productModel_1.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Organization not found" }));
        }
        else {
            const body = await utilis_1.getData(req);
            const { productName, productDescription, productVarieties } = JSON.parse(body);
            const productData = {
                productName: productName || product.productName,
                productDescription: productDescription || product.productDescription,
                productVarieties: productVarieties || product.productVarieties,
                dateUploaded: product.dateUploaded,
                dateEdited: new Date().toISOString(),
            };
            const updateProduct = await productModel_1.update(id, productData);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updateProduct));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.updateProduct = updateProduct;
async function deleteProduct(req, res, id) {
    try {
        const product = await productModel_1.findById(id);
        //Check if organization exist
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
        }
        else {
            await productModel_1.removeDelete(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Product ${id} removed` }));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteProduct = deleteProduct;
