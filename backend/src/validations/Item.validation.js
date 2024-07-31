const {body, param, query} = require("express-validator")
class ItemValidation {

        static CreateItem= [
                body("user").isMongoId().notEmpty().withMessage("User Is Required"),
                

        ]   
        static Params_id= [
                param("id").isMongoId().withMessage("provide valid Id").notEmpty().withMessage("Id is required")
            ]

            static RegisterItem = [
                body("item_name").notEmpty().withMessage("name can not be empty"),
                
                body("price").notEmpty().withMessage("price can not be empty"),
    
              
        ]

        static query_page= [
                query("page").optional(),
                query("query").optional(),
            ]

}



module.exports = ItemValidation