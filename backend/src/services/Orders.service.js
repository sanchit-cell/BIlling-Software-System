const httpStatus = require("http-status");
const { OrdersModel, ConsumerModel } = require("../models");
const ApiError = require("../utils/ApiError");

class OrderService {
  static async createOrder(user, body) {
    await OrdersModel.create({
      user,
      consumer: body.user,
      Items: body.items,
    });

    return {
      msg: "Order Created Successfully",
    };
  }
  static async getAllorders(user, page = 1, query = "") {
    const limit = 10;
    const perPage = (Number(page) - 1) * limit;

    const queryies = {
      user,
      $or: [
        {
          name: new RegExp(query),
        },
        {
          email: new RegExp(query),
        },
      ],
    };

    const Consumer = await ConsumerModel.find(queryies).distinct("_id");

    if (!Consumer.length) {
      const data = await OrdersModel.find({ user })
        .populate("consumer", "name email")
        .populate("Items")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(perPage);

      const documents = await OrdersModel.countDocuments(user);
      const hasMore = perPage + limit < documents;
      console.log(data);

      return {
        data,
        hasMore,
      };
    }

    const data = await OrdersModel.find({ consumer: { $in: Consumer } })
      .populate("consumer", "name email")
      .sort({ createdAt: -1 })
      .populate("Items")
      .limit(limit)
      .skip(perPage);

    const documents = await OrdersModel.countDocuments({
      consumer: { $in: Consumer },
    });
    const hasMore = perPage + limit < documents;
    console.log(data);

    return {
      data,
      hasMore,
    };
  }

  static async deleteOrder(user, id) {
    const existOrder = await OrdersModel.findOne({ user, _id: id });

    if (!existOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found");
      return;
    }

    await OrdersModel.findByIdAndDelete(existOrder._id);

    return {
      msg: "Order Delete Successfully",
    };
  }
  static async getInvoiceById(user, id) {
    const order = await OrdersModel.findOne({ user, _id: id })
      .select("consumer user items createdAt")
      .populate("consumer", "name email address -_id")
      .populate("Items")
      .populate("user", "name -_id");

    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found");
      return;
    }
    return order;
  }
}

module.exports = OrderService;
