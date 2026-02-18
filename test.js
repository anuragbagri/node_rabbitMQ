import fs from "fs/promises";
import fssync, { read } from "fs";

(async function main(){
   const fileHandler = await fs.open("anurag.txt" , "r");
   const filehandler2 = await fs.open("anurag.txt" , "r" , (err) => {
    console.log(err);
   })

   const fileHandler3 = fssync.open("anurag.txt" , "r");
   const readstream = fileHandler.createReadStream();
   readstream.on("data" , (chunk) => {
    filehandler2.write(chunk.toString());
   })
})