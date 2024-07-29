const trigger = require("express").Router();

// controller
const controller = require("../controllers/trigger.controller");

trigger.get("/isUpdate", controller.getStatusUpdate);
trigger.post("/setUpdate", controller.setStatusGet);

module.exports = trigger;
