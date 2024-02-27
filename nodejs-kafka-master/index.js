import express from "express";
import bodyParser from "body-parser";
import constrollers from "./controller.js";
import KafkaConfig from "./config.js";

const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, constrollers.sendMessageToKafka);

// consume from topic "test-topic"
const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (value) => {
  // const data = JSON.parse(value);
  // console.log("📨 Receive message: ", data);
  // console.log("📨 Receive message: ", typeof data);
  console.log("📨 Receive message: ", JSON.parse(value));
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
