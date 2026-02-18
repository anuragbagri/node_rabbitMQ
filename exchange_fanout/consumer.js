import amqp from "amqplib";

(async function emailConsumer(){
     const connection = await amqp.connect("amqp://localhost");
     const channel = await connection.createChannel(); 
     await channel.assertExchange("new_product" ,"fanout", {durable : false});

     const queue = await channel.assertQueue("" , { durable : false});

     await channel.bindQueue(queue.queue , "new_product" , "");

     channel.consume(queue.queue , (message) => {
        if(message){
            console.log(JSON.parse(message.content));
            channel.ack(message);
        }
     });
})();