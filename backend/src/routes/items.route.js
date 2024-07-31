const express = require("express")
const Authentication = require("../middlewares/Authentication"); 
const Validation = require("../middlewares/Validation");
const {CreateItem,Params_id,RegisterItem,query_page} = require("../validations/Item.validation")

const router = express.Router();
const ItemsController = require("../controllers/Items.controller")

router.use(Authentication);

router.route("/create-item")
.post(CreateItem,ItemsController.createItem)

router.route("/get-items")
.get(ItemsController.getAllitems)

router.get("/get/:id",Params_id,Validation,ItemsController.getById)
router.patch("/update/:id",RegisterItem,Validation,ItemsController.updateById)
router.get("/get-all",query_page,Validation,ItemsController.GetAllitems)

// router.route("/get-invoice/:id")
// .get(OrdersController.getInvoiceById)

// router.route("/delete/:id")
// .delete(OrdersController.deleteOrder)


module.exports = router