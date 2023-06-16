const express = require("express");

const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

//Usada antes con datos quemados
const posts = require('../../data/posts.example.json');

const postController = require('../../controllers/post.controller');

const postValidators = require('../../validators/post.validators');
const runValidations = require('../../validators/index.middleware');

const {authentication, authorization} = require('../../middlewares/auth.middlewares');

router.get("/", postController.findAll);

router.get("/hidden",  postController.findAllHidden);

router.get("/own",  authentication, 
                    postController.findOwn);

router.get("/saved",    authentication, 
                        postController.getOwnSavedPosts)
                     
router.get("/user/:identifier", postValidators.findPostByIdValidator,
            runValidations,
            postController.findPostsByUser
);

router.get("/:identifier", 
    postValidators.findPostByIdValidator,
    runValidations,
    postController.findOneById
);

//Se debe tomar como una funcionaldiad de usuario
router.post("/", 
    authentication,
    authorization(ROLES.USER, ROLES.ADMIN),
    postValidators.createPostValidator,
    runValidations,  
    postController.create);

router.post("/update/:identifier",
    authentication,
    authorization(ROLES.USER, ROLES.ADMIN),
    postValidators.createPostValidator,
    runValidations,  
    postController.postUpdate);

router.patch("/visibility/:identifier", authentication,
                                        authorization(ROLES.USER, ROLES.ADMIN),
                                        postValidators.findPostByIdValidator,
                                        runValidations,
                                        postController.togglePostVisibility
);



router.patch("/save/:identifier",   authentication,
                                    authorization(ROLES.USER, ROLES.ADMIN),
                                    postValidators.findPostByIdValidator,
                                    runValidations,
                                    postController.toggleSavedPosts
);


module.exports = router;