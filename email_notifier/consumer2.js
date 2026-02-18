import amqp from "amqplib";
import { config } from "./publisher.js";
(async function consumer2(){
    try {
        const connection = await amqp.connect();
        const channel = await connection.createChannel();
        await channel.assertQueue(config.unsubscribed.queue ,{durable : false});
        
        channel.consume(config.unsubscribed.queue , (message) => {
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