import ampq from "amqplib";
import { config } from "./config.js";

// creating a notification broker for youtube
const publishMessageToQueue = async (headers , message) => {
    try {
    const connection = await ampq.connect("amqp://localhost");const channel = await connection.createChannel();
    const exchangeType = config.exchangeType;
    const exchangeName = config.exchangeName;
    await channel.assertExchange(exchangeName , exchangeType , { durable : true }); 
    // persistant == durable ... 
    channel.publish(exchangeName , "" , Buffer.from(message), {
        persistent  : true,
        headers
    });

    setTimeout(() => {
        console.log("message published to the exchange -->" , message);
        connection.close();
    }, 500);
    }
    catch(error){
        console.log("error while publishing message to the exchange");
    }
}; 

publishMessageToQueue({"x-match" : "all" , "content-type" : "video" , "notification-type" : "live_stream"}, "live stream is started ... please join");

publishMessageToQueue({"x-match" : "all" , "content_type" : "user_like" , "notification_type" : "like"} , "you got a like from someone");