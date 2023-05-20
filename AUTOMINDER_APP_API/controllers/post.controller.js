const Post = require('../models/Car.model');
const debug = require('debug')('app:post.controller');
const User = require("../models/User.model");

const controller = {};

controller.create = async (req, res) => {

    try{
        const { title, marca, modelo, year, nextMaintenance, kilometers, kilometersDate, lastOilChange, lastCoolanChange, tunedMayor, tunedMinor, errorRecord, user_id} = req.body;

        // const { username } = req.user; Codigo reemplazado en clase 26
        const { _id: userId } = req.user; //    Se asume la existencia del usuario dada las verificaciones 


        // debug(`Creating post for user ${username}`); Eliminacion por parte de Douglas por error de servidor

        const post = new Post({
            title: title,
            marca: marca,
            modelo: modelo,
            year: year,
            nextMaintenance: nextMaintenance,
            kilometers: kilometers,
            kilometersDate: kilometersDate,
            lastOilChange: lastOilChange,
            lastCoolanChange: lastCoolanChange,
            tunedMayor: tunedMayor,
            tunedMinor: tunedMinor,
            errorRecord: errorRecord,
            user_id: user_id

        });

        const newPost = await post.save();

        if(!newPost) {
            return res.status(409).json({ message: 'Error creating post' });
        }

        return res.status(201).json(newPost);   
    } catch(error){
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor' });
    }
};

controller.findAll = async (req, res) => {
    try {
        
        // Declarado asi por cuestiones de estetica, no es funcional
        const posts = await Post
                                .find({ hidden: false })
                                .populate("user", "username email");

        return res.status(200).json({ posts });

    } catch (error) {
        
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor' });
    }
}

controller.findOwn = async (req, res) => {
    try {
        
        const { _id: userId } = req.user;

        const posts = await Post
                        .find({ user: userId })
                        .populate("user", "username email")
                        .populate("likes", "username email");

        return res.status(200).json({ posts });

    } catch (error) {
        
        debug({ error });

        return res.status(500).json({ message: 'Error interno de servidor' });

    }
}

controller.findPostsByUser = async (req, res) => {
    
    try {
        const { identifier } = req.params;

        const posts = await Post.find( { user: identifier, hidden: false });

        return res.status(200).json({posts});

    } catch (error) {

        debug({ error });

        return res.status(500).json({ message: 'Error interno de servidor' });
    }

}    

controller.findOneById = async (req, res) => {
    try {
        const { identifier } = req.params;

        const post = await Post
                        .findOne({_id: identifier, hidden: false })
                        .populate("user", "username email")
                        .populate("likes", "username email");

        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json({ post });

    }catch(error) {
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor' });
    }
}

controller.getOwnSavedPosts = async (req, res) => {
    try {
        
        const { _id } = req.user;

        const user = await User.findById(_id)
                        .populate("savedPosts");
                        

        return res.status(200).json({ posts: user.savedPosts.filter(post => !post.hidden) });

    } catch (error) {
        
        debug({ error });

        return res.status(500).json({ message: 'Error interno de servidor' });

    }
}

controller.togglePostVisibility = async (req, res) => {
    try {
        const { identifier: postId } = req.params;

        const { _id: userId } = req.user;

        const post = await Post.findOne({ _id: postId, user: userId });

        if(!post)
        {
            return res.status(404).json({ error: "Post no encontrado "});
        }

        post.hidden = !post.hidden;

        await post.save();

        return res.status(200).json({ message: "Post actualizado exitosamente!" });

    } catch (error) {
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor(togglePostVisibility)' });
    }
};

controller.togglePostLike = async (req, res) => {
    try {
        
        const { identifier: postId } = req.params;

        const { _id: userId } = req.user;

        const post = await Post.findOne( { _id: postId, hidden: false });

        if(!post)
        {
            return res.status(404).json({ error: "Post no encontrado "});
        }

        const index = post.likes.findIndex( _userId => _userId.equals(userId));

        if(index >= 0 ){
            post.likes = post.likes.filter(_userId => !_userId.equals(userId));
        }
        else {
            post.likes = [ ...post.likes, userId ];
        }

        await post.save();
        
        return res.status(200).json({ message: "Post actualizado exitosamente!" });

    } catch (error) {
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor(togglePostLike)' });
    }
}

controller.toggleSavedPosts = async (req, res) => {
    try {
        const { identifier: postId } = req.params;
        const { user } = req;

        const post = await Post.findOne({ _id: postId, hidden: false });

        if(!post)
        {
            return res.status(404).json({ error: "Post no encontrado "});
        }

        const index = user.savedPosts.findIndex( _postId => _postId.equals(postId));

        if(index >= 0 ){
            user.savedPosts = user.savedPosts.filter(_postId => !_postId.equals(postId));
        }
        else {
            user.savedPosts = [ ...user.savedPosts, postId ];
        }

        await user.save();
        
        return res.status(200).json({ message: "Post guardado exitosamente!" });

    } catch (error) {
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor (toggleSavedPosts)' });
    }
}

module.exports = controller;