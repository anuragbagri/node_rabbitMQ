// no change in the publisher code 

import amqp from "amqplib";

(async function producer(){
   const connection = await amqp.connect("amqp://localhost");
   const channel = await connection.createChannel();
   const message = {
    id : Math.floor(Math.random() * 10),
    name : "shoes",
    date : Date.now(),
   }

   await channel.assertExchange("new_product" , "fanout" , {durable : false});

   channel.publish("new_product" , "" , Buffer.from(JSON.stringify(message)));  // this message will we consumed by all the queues connected to the exchange. 

   setTimeout(() => {
        connection.close();
   }, 500);
})();