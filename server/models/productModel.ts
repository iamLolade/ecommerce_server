import {writeToDataBase} from "../utilis";

interface obj {
    [key: string]: string | string[]
}

type identity = {
    [key: string]: number
}

const products = require("../../data/product.json")


//Get request
export function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

function generateId() {
    let id;
    if(products.length === 0) {
        id = 1;
    } else {
        id = +(products[products.length - 1].id) + 1
    }
    return id;
}



export function findById(id:number) {
    return new Promise((resolve, reject) => {
        const product = products.find((elem: identity) => elem.id === id)
        resolve(product)
    })
}

//Post request

export function create(item:obj[]) {
    return new Promise((resolve, reject) => {
        const newItems = {id:generateId(),...item}
        products.push(newItems)
        writeToDataBase("./data/product.json", products)
        resolve(newItems)
    })
}

//Put request

export function update(id:number, product:obj) {
    return new Promise((resolve, reject) => {
        const i = products.findIndex((val: identity) => val.id === id)
        products[i] = {id, ...product} as any
        writeToDataBase("./data/product.json", products)
        resolve(products[i])
    })
}


//Delete request

export function removeDelete(id:number) {
    return new Promise((resolve, reject) => {
        const result = products.filter((val:any) => val.id !== id)
        writeToDataBase("./data/product.json", result);
        resolve(result);
    })
}