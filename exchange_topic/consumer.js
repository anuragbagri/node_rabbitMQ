import amqp from "amqplib";

(async function (){
   const connection = await amqp.connect("amqp://localhost");
   const channel = await connection.createChannel();
   await channel.assertExchange("topic_exchange" , "topic" , {durable : false});
   await channel.assertQueue("email_service_queue" , {durable : false});
   await channel.bindQueue("email_service_queue" , "topic_exchange" , "order.*");

   channel.consume("email_service_queue" , (msg) => {
    if(msg){
        console.log(JSON.parse(msg.content));
        channel.ack(msg);   // use try and catch block .... 
    }
   })
})();