const router = require("express").Router();


const routes= [
    {
        path:'/auth',
        route:require("./Auth.route")
    },
      {
        path:'/consumer',
        route:require("./Consumer.route")
    },
     {
        path:'/orders',
        route:require("./Order.route")
    },
    {
        path:"/items",
        route: require("./items.route")
    },
    {
        path:"/pay",
        route:require("./create.checkout.session")

    }
]


routes.forEach((cur)=>{
    router.use(cur.path,cur.route);
})

module.exports = router