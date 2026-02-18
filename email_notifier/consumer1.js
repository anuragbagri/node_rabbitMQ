import amqp from "amqplib";
import { config } from "./publisher.js";

(async function consumer1(){
    try {
        const connection = await amqp.connect();
        const channel = await connection.createChannel();
        await channel.assertQueue(config.subscribed.queue ,{durable : false});
        
        channel.consume(config.subscribed.queue , (message) => {
            if(message){
              console.log("message -> ", JSON.parse(message.content))
              channel.ack(message);
            }
        })
    }
    catch(err){
        console.log(err);
    }
})();