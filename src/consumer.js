// import amqp from "amqplib";
// import { config } from "./config.js";

// /**
//  * @description : function for consumer. consumes the data send from the queue
//  * @params : empty
//  */

// (async function receiveMail(){
//  try  {

//     const connection = await amqp.connect("amqp://localhost");
//     const channel = await connection.createChannel(); 
//     await channel.assertQueue(config.queue_name , {durable : false});
//     console.time("timecheck");
//     channel.consume(config.queue_name , (message) => {
//     if(message){
//       console.log("message ---> ", JSON.parse(message.content))
//     }
//  });
//  console.timeEnd("timecheck"); 
//  }
//  catch(err){
//     console.log(err);
//  }
// })();