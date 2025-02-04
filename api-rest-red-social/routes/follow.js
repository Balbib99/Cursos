const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");
const auth = require("../middlewares/auth");

// Definir rutas
router.get("/prueba-follow", FollowController.pruebaFollow);

router.post("/save", auth.auth , FollowController.save);
router.delete("/unfollow/:id", auth.auth , FollowController.unfollow);
router.get("/followers/:id?/:page?", auth.auth , FollowController.followers);
router.get("/following/:id?/:page?", auth.auth , FollowController.following);

// Exportar router
module.exports = router;