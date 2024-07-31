const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");
const { ItemsModel } = require("../models");

class ItemsService {
  static async createItem(user, body) {
    try {
      await ItemsModel.create({
        user,
        item_name: body.item_name,
        Quantity: body.Quantity,
        About: body.About,
        inStock: body.inStock,
        price: body.price,
      });
    } catch (error) {
      console.log("model not initated");
      throw new ApiError(httpStatus.NOT_IMPLEMENTED, "item Not created");
      return;
    }

    return {
      msg: "Item Created Successfully",
    };
  }
  static async getAllitems(user) {
    const items = await ItemsModel.find({ user }).select("item_name price ");
    console.log(items);

    return {
      items,
    };
  }

  static async getById(user, id) {
    const checkExist = await ItemsModel.findOne({ _id: id, user: user });

    console.log({ user, id });

    if (!checkExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Consumer Not Found in Record"
      );
      return;
    }

    return {
      item: checkExist,
    };
  }

  static async updateById(user, body, id) {
    const { item_name, price } = body;

    const checkExist = await ItemsModel.findById({ _id: id });

    if (checkExist.item_name !== item_name) {
      const checkExistEmail = await ItemsModel.findOne({
        item_name: item_name,
        price: price,
      });

      if (checkExistEmail) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Consumer Email Already in Another Record "
        );
        return;
      }
    }

    await ItemsModel.findByIdAndUpdate(id, {
      item_name,
      price,
      user,
    });

    return {
      msg: "Item Update :)",
    };
  }

  static async GetAllItem(user, page = 1, query = "") {
    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    const queryies = {
      user,
      $or: [
        {
          item_name: new RegExp(query),
        },
      ],
    };

    const data = await ItemsModel.find(queryies)
      .select("item_name price Quantity inStock About createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalConsumer = await ItemsModel.countDocuments(queryies);

    const hasMore = skip + limit < totalConsumer;

    return {
      items: data,
      more: hasMore,
    };
  }

  static async getInvoiceById(user, id) {
    const order = await OrdersModel.findOne({ user, _id: id })
      .select("consumer user items createdAt")
      .populate("consumer", "name email address -_id")
      .populate("user", "name -_id");

    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found");
      return;
    }

    return order;
  }
}

module.exports = ItemsService;
