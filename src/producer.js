// import amqp from "amqplib";
// import { config } from "./config.js";

// /**
//  * @description function for producers. sends data to the rabbitmq
//  * @params none
//  * @returns nothing
//  */
// (async function sendMail(){
//     try {
//         const connection = await amqp.connect("amqp://localhost");
//         const channel = await connection.createChannel();  // producer runs on channel
//         const exchange = config.exchange_name || " ";
//         const queue = config.queue_name || " ";
//         const routingKey = config.routingkey_name || " ";
//         const message = {
//             to : "anurag111bagri@gmail.com",
//             from : "hari@gmail.com",
//             subject : "mail from hr",
//             body : "something from second message"
//         }

//         await channel.assertExchange(exchange , "direct" , {durable : false}); // create the exchange (type exchange => one of the type of exchange) and durable means data should not be persistant. 
        
//         // queue
//         await channel.assertQueue(queue , {durable : false}); // not persistant
        
        
//         await channel.bindQueue(queue , exchange , routingKey);  // bind queue with the exchange using .bind(queue, exchange, routingkey); 

//         // data to queue 
//         channel.publish(exchange , routingKey , Buffer.from(JSON.stringify(message))); // send data to queue using the routing key.we have to send data only in form of buffer and in form of strings. 
//         console.log("mail data was sent --> ", message)

//         setTimeout(() => {
//             connection.close();
//         }, 500);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// )();


// ### the above code is for the single exchange,single queue and single consumer. 

// this if for practice ... 

// import amqp from "amqplib";
// import { config } from "./config";
// (async function main(){

// const connection = await amqp.connect();
// const channel = await connection.createChannel();
// await channel.assertExchange(config.exchange_name , "direct" , {durable : false});
// await channel.assertQueue(config.queue_name, {durable : true} );
// await channel.bindQueue(config.exchange_name , config.queue_name , config.routingkey_name );
// channel.publish(config.exchange_name , config.routekey , Buffer.from(message).toString());
// setTimeout(() => {
//     connection.close();
// }, 500);

// })();


// (async function consumer(){
//  const connection = amqp.connect("amqp://localhost");
//  const channel = await connection.createChannel();
//  await channel.assertQueue(config.queue_name , {durable : false});
//  channel.consume(config.queue_name , (message) =>{
//     if(message.content){
//         console.log("this is the message --> ", JSON.parse(message.content));
//     }
//  } )
// })();



