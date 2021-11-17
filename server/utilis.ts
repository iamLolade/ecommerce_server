import fs from 'fs';
import { IncomingMessage,ServerResponse } from 'http';
interface Obj {
    [key: string]:string|number |{[key: string]:string}
}
export function writeToDataBase(filename:string, content:Obj[]){
  fs.writeFileSync(filename, JSON.stringify(content, null, 4),"utf-8")
}
export async function getData(req:IncomingMessage){
    return new Promise((resolve,reject)=>{
        try{
            let body = "";
            req.on('data', (chunk)=>{
               body += chunk.toString();
            });
              req.on("end",()=>{
                  resolve(body)
              })
        }catch(error){
            reject(error);
        }
    })
}