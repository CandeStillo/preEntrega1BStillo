const Router = require ('express').Router

const router = Router()

router.get("/", (req, res)=>{
    res.status(200).json({
        cart : "cart"
    })
})

router.post("/", (req, res) => {
    res.status(200).json({
        cart: "Cart post OK...!!!"
    })
})

module.exports = router