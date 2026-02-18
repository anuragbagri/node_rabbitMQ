import amqp from "amqplib";

(async function smsConsumer(){
     const connection = await amqp.connect("amqp://localhost");
     const channel = await connection.createChannel(); 
     await channel.assertExchange("new_product" ,"fanout", {durable : false});

     const queue = await channel.assertQueue("" , { exclusive : true});  // the fanout exchanges we dont have the queue names as well. and instead of durable, we have exclusive which means as soon as the connection to the queue is broken, delete the queue. 

     await channel.bindQueue(queue.queue, "new_product" , "");

     channel.consume(queue.queue , (message) => {
        if(message){
            console.log(JSON.parse(message.content));
            channel.ack(message);
        }
     });
})();