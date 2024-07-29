// model
const { Trigger } = require("../models");

// utils
const date = require("../utils/date");

exports.triggerUpdateDate = async (transaction) => {
  try {
    const payload = {
      update_data: date.getCurrentDate(),
    };

    const result = await Trigger.update(payload, {
      where: { id: 1 },
      transaction,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

exports.triggerGetData = async (transaction) => {
  try {
    const payload = {
      get_data: date.getCurrentDate(),
    };

    const result = await Trigger.update(payload, {
      where: { id: 1 },
      transaction,
    });

    return {
      status: 200,
      message: "Updated Successfully!",
    };
  } catch (error) {
    throw error;
  }
};

exports.checkTriggerStatus = async () => {
  try {
    const result = await Trigger.findOne({
      where: { id: 1 },
    });

    if (result.get_data > result.update_data) {
      return {
        data: {
          message: "Updated",
          status: true,
        },
      };
    } else {
      return {
        data: {
          message: "Not Updated",
          status: false,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};
