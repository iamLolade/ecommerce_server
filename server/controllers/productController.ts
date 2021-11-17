import http, { IncomingMessage, ServerResponse } from "http";
import { getData } from "../utilis";
import {findAll, findById, create, update, removeDelete} from "../models/productModel";

interface Obj {
    [key: string]: string | number | { [key: string]: string};
}

export async function getProduct(req:IncomingMessage, res:ServerResponse) {
    try {
        const products = await findAll();
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(products))
    } catch (error) {
        res.end("Unable to retreive products from database");
    }
}

export async function getSingleProduct(
    req: IncomingMessage,
    res: ServerResponse,
    id: number
    ) {
        try {
            const product = await findById(id);
            if(!product) {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: "Product not found"}));
            } else {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(product));
            }
        } catch (error) {
            console.log(error);
        }
}

export async function createProduct(req:IncomingMessage, res: ServerResponse) {
    try {
        const body = (await getData(req)) as string;
        const {
                productName,
                productDescription,
                productVarieties
            } = JSON.parse(body);
            const product: any = {
                productName,
                productDescription,
                productVarieties,
                dateUploaded: new Date().toISOString(),
                dateEdited: new Date().toISOString()
            };

            const newProduct = await create(product);
            res.writeHead(201, {"Content-Type":"application/json"});
            return res.end(JSON.stringify(newProduct));
        } catch (error) {
            console.log(error);
    }
}

export async function updateProduct(
    req: IncomingMessage,
    res: ServerResponse,
    id: number
    ) {
        try {
            const product: any = await findById(id);
            if(!product) {
                res.writeHead(404, {"Content-Type":"application/json"});
                res.end(JSON.stringify({message: "Organization not found"}));
            } else {
                const body: any = await getData(req);
                const {
                    productName,
                    productDescription,
                    productVarieties
                } = JSON.parse(body);
                const productData: any = {
                    productName: productName || product.productName,
                    productDescription: productDescription || product.productDescription,
                    productVarieties: productVarieties || product.productVarieties,
                    dateUploaded: product.dateUploaded,
                    dateEdited: new Date().toISOString(),
                };
                const updateProduct = await update(id, productData);
                res.writeHead(200, {"Content-Type":"application/json"});
                return res.end(JSON.stringify(updateProduct))
            }
        } catch (error) {
            console.log(error)
        }
}


export async function deleteProduct(
    req: IncomingMessage,
    res: ServerResponse,
    id: number
    ) {
        try {
            const product = await findById(id);

            //Check if organization exist
            if(!product) {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: "Product not found"}));
            } else {
                await removeDelete(id);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: `Product ${id} removed`}));
            }
        } catch (error) {
            console.log(error);
        }
    
}