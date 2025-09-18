const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const isauth=require('../middleWares/authMiddleware')


router.get("/", postController.getAllPosts);
router.get("/create",isauth, postController.getCreatePost);
router.post("/create",isauth, postController.createPost);
router.get("/:id",isauth, postController.getSinglePost);
router.get("/edit/:id",isauth, postController.getEditPost);
router.post("/edit/:id",isauth, postController.updatePost);
router.get("/delete/:id",isauth, postController.deletePost);

module.exports = router;
