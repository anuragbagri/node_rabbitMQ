// in topic exchanges ... queues are defined in the consumer side... not the publisher side
import amqp from "amqplib";

(async function main(){
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const message = {
    name : "anurag",
    last : "bagri",
    emailfrom : "anurag@gmail.com",
    emailto : "sub@gmial.com"
  };

  const payment_message  = {
     name : "anurag",
     last : "bagri",
     status : "payment done"
  }
  await channel.assertExchange("topic_exchange" ,"topic", { durable : false});
  channel.publish("topic_exchange" , "order.created" , Buffer.from(JSON.stringify(message)));
  channel.publish("topic_exchange" , "payment.done" , Buffer.from(JSON.stringify(payment_message)));

  setTimeout(() => {
    console.log("message --> ", message);
    connection.close();
  }, 500);

})();