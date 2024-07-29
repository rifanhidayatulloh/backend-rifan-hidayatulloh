const sql = require("../models").sequelize;

// services
const triggerService = require("../services/trigger.service");

exports.getStatusUpdate = async (req, res, next) => {
  try {
    const data = await triggerService.checkTriggerStatus();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.setStatusGet = async (req, res, next) => {
  const transaction = await sql.transaction();
  try {
    const data = await triggerService.triggerGetData(transaction);

    await transaction.commit();
    return res.status(200).json(data);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
