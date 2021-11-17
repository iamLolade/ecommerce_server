"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDelete = exports.update = exports.create = exports.findById = exports.findAll = void 0;
const utilis_1 = require("../utilis");
const products = require("../../data/product.json");
//Get request
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}
exports.findAll = findAll;
function generateId() {
    let id;
    if (products.length === 0) {
        id = 1;
    }
    else {
        id = +(products[products.length - 1].id) + 1;
    }
    return id;
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((elem) => elem.id === id);
        resolve(product);
    });
}
exports.findById = findById;
//Post request
function create(item) {
    return new Promise((resolve, reject) => {
        const newItems = { id: generateId(), ...item };
        products.push(newItems);
        utilis_1.writeToDataBase("./data/product.json", products);
        resolve(newItems);
    });
}
exports.create = create;
//Put request
function update(id, product) {
    return new Promise((resolve, reject) => {
        const i = products.findIndex((val) => val.id === id);
        products[i] = { id, ...product };
        utilis_1.writeToDataBase("./data/product.json", products);
        resolve(products[i]);
    });
}
exports.update = update;
//Delete request
function removeDelete(id) {
    return new Promise((resolve, reject) => {
        const result = products.filter((val) => val.id !== id);
        utilis_1.writeToDataBase("./data/product.json", result);
        resolve(result);
    });
}
exports.removeDelete = removeDelete;
