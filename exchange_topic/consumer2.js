import amqp from "amqplib";


(async function consumer(){
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertExchange("topic_exchange" , "topic" , {durable : false});
    await channel.assertQueue("payment_queue" , {durable : false});
    await channel.bindQueue("payment_queue" , "topic_exchange" , "payment.*");

    channel.consume("payment_queue" , (message) => {
        if(message){
            console.log(JSON.parse(message.content));
            channel.ack(message);
        }
    }) 
})();