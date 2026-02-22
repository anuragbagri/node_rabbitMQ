import amqp from "amqplib";
import { config } from "./config.js";


(async function consumer2(){
   try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertExchange(config.exchangeName , config.exchangeType , {durable : true});
     
    // queue for like notification service
    const queue = await channel.assertQueue("" , {durable : true});
    
    await channel.bindQueue(queue.queue , config.exchangeName,"", {
      "x-match" : "all",
      "content_type" : "user_like",
      "notification_type" : "like"
    });

    channel.consume(queue.queue , (msg) => {
        if(msg){
            console.log((msg.content).toString());
            channel.ack(msg);
        }
    })
   }
   catch(err){
    // should be some kind of standard error response. 
    console.log("error in comsuming the message from the exchange"); 
   }
})();