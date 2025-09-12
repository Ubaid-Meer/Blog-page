const express=require('express')
const router=express.Router()
const postController=require('../controllers/postControllers')

//show all post Route
router.get('/',postController.getallPosts);


router.get('/create',postController.getCreatePost)
router.post('/create',postController.createPost)


router.get('/:id',postController.getSinglePost)



router.get('/edit/:id',postController.getEditPost)
router.put('/edit/:id',postController.updatePost)


router.delete('/delete/:id',postController.deletePost)