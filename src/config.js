export const config = {
    queue_name : "mail_queue",
    exchange_name : "mail_exchange",
    routingkey_name : "mail_key" | " "
}

export const subscribeConfig = {
    queue_name : "subscribe_queue",
    exchange_name  : "subscribe_exchange",
    routingKey_name : "subscribe_key"
 }

export const normalUserconfig = {
    queue_name : "normal_queue",
    exchange_name : "normal_exchange",
    routingKey_name : "normal_key"
}