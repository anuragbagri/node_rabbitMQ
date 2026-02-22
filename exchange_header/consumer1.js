import ampq from "amqplib";
import { config } from "./config.js";

(async function consumeMessage(){
    try {
    const connection = await ampq.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertExchange(config.exchangeName,config.exchangeType , { durable : true});

    const queue = await channel.assertQueue("" , {durable : true});

    // bind the queue to accept messages only containing the following headers.

    await channel.bindQueue(queue.queue , config.exchangeName ,"", {
        "x-match" : "all",
        "content-type" : "video",
        "notification-type" : "live_stream"
    });

    channel.consume(queue.queue , (msg) => {
         if(msg){
            console.log((msg.content).toString());
            channel.ack(msg);
         }
    })
    }  
    catch(err){
        console.log("error while consuming the message");
    }  
})();