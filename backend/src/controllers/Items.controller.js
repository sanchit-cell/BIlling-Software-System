const httpStatus = require("http-status"); 
const CatchAsync = require("../utils/CatchAsync"); 
const ItemsService = require("../services/ItemsService")



class ItemsController{
            static createItem= CatchAsync(async(req,res)=>{
                const res_obj  = await ItemsService.createItem(req?.user,req.body);
                return    res.status(httpStatus.CREATED).json(res_obj)
                 
            })

  static getAllitems= CatchAsync(async(req,res)=>{
                const res_obj  = await ItemsService.getAllitems(req?.user);
                return    res.status(httpStatus.OK).json(res_obj)
                 
            })

            static getById= CatchAsync(async(req,res)=>{
                const res_obj  = await ItemsService.getById(req?.user,req.params.id);
                return    res.status(httpStatus.OK).json(res_obj)
                 
            })

            static updateById= CatchAsync(async(req,res)=>{
                const res_obj  = await ItemsService.updateById(req?.user,req.body,req.params.id);
                return    res.status(httpStatus.OK).json(res_obj)
                 
            })
            static GetAllitems= CatchAsync(async(req,res)=>{
                const res_obj  = await ItemsService.GetAllItem(req?.user,req.query?.page,req.query?.query);
                return    res.status(httpStatus.OK).json(res_obj)
                 
            })
   


            
            
            

        }

        
module.exports = ItemsController