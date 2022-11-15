import init from "react_native_mqtt";
import mqttConfig from "./mqttConfig";

const addr = mqttConfig.addr;
const port = mqttConfig.port;
const subTopic = mqttConfig.subTopic;
const topic = mqttConfig.topic;
const user = mqttConfig.user;
const password = mqttConfig.password;

 init({
  size: 10000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

export const client = new Paho.MQTT.Client(
  addr,
  port,
  "clientID-1" + parseInt(Math.random() * 100)
);

export async function mqttInit(client) {
  const onMessageArrived = (message) => {
    console.log(" onMessageArrived : " + message.payloadString);
  };

  const onConnect = () => {
    console.log(" onConnect ");
  };

  const onFailure = () => {
    console.log(" failure ");
  };
  client.onMessageArrived = onMessageArrived;
  await client.connect({
    onSuccess: onConnect,
    useSSL: false,
    userName: user,
    password: password,
    onFailure: onFailure,
  });
}
export function mqttPub(client , message) {
  client.publish(topic, message);
}
export function mqttSub(client) {
  client.subscribe(subTopic);
}

//client.publish(topic, "ping");
//client.subscribe (topicsub) ;
