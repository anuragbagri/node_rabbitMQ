import amqp from "amqplib";

/**
 * @description : this function will have two queues and one exchanges. one for subscribed users and other for unsubscribed users
 * @params : none
 * @returns : nothing
 * @suggestion : use a config layer to store all the names and configuration. 
 */

export const config = {
        subscribed  : {
            exchange : "exchange",
            queue : "subscribed_queue",
            routekey : "subscribed_routekey"
        },
        unsubscribed : {
           exchange : "exchange",
           queue : "unsubscribed_queue",
           routekey : "unsubscribed_routekey"
        }
    };

(async function producer(){
    
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertExchange(config.subscribed.exchange,"direct" , {durable : false} );   //create one exchange
    await channel.assertQueue(config.subscribed.queue , {durable : false});   // link to susbcribe queue 
    await channel.assertQueue(config.unsubscribed.queue , {durable : false}); // link to unsubscribe queue
    const message1 = {
        name  : "anurag",
        lastname : "bagri",
        email : "anurag123bagri@gmail.com",
        status : "subscribed"
    }; 
    const message2 = {
      name : "anupam",
      lastname : "bagri",
      email : "anurag111bagri@",
      status : "unsubscibed"
    };

    await channel.bindQueue(config.subscribed.queue , config.subscribed.exchange , config.subscribed.routekey);    // bind the exchange to queue
    await channel.bindQueue(config.unsubscribed.queue , config.unsubscribed.exchange , config.unsubscribed.routekey);   
    // exchange name should be same for both. 


    // publish message to first consumer
    channel.publish(config.subscribed.exchange , config.subscribed.routekey , Buffer.from(JSON.stringify(message1))); 

    // second consumer  
    // channel.publish(config.subscribed.exchange , config.unsubscribed.routekey, Buffer.from(JSON.stringify(message2)));
    
    setTimeout(() => {
        console.log(message1);
        console.log(message2);
        connection.close();

    }, 500);


})();