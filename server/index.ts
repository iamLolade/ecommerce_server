import http, { IncomingMessage, Server, ServerResponse } from "http";
const {getProduct, getSingleProduct, createProduct, updateProduct, deleteProduct} = require("./controllers/productController")
/*
implement your server code here
*/

const server :Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    let address = req.url as string;
    if (address === "/api/products" && req.method === "GET") {
     getProduct(req,res);
    } else if(address.match(/\api\/products\/([0-9]+)/) && req.method === "GET"){
      const id = +address.split('/').slice(-1)[0];
      getSingleProduct(req,res,id)
    }else if(address === "/api/products"  && req.method === "POST"){
      createProduct(req,res)
    }
    else if (
      // PUT request to update
      address.match(/\/api\/products\/([0-9]+)/) &&
      req.method === "PATCH"
    ) {
      const id = +address.split("/").slice(-1)[0];
      updateProduct(req, res, id);
    }
    else if (
      // Delete request to delete
      address.match(/\/api\/products\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = +address.split("/").slice(-1)[0];
      deleteProduct(req, res, id);
    }else{
      res.writeHead(404, {"Content-Type":"application/json"});
      res.end(JSON.stringify({message:"Route not found"}))
    }
}

);

const PATH = process.env.PORT || 3000;

server.listen(PATH, () => {
  console.log("Running on port 3000");
});
