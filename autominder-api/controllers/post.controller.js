const Post = require('../models/Post.model');
const debug = require('debug')('app:post.controller');
const User = require("../models/User.model");

const controller = {};

controller.create = async (req, res) => {
    try{
        const {id, vin, car_name, brand, model, year, lastMaintenance, kilometers, lastOilChange, lastCoolantChange, mayorTuning, minorTuning, errorRecord} = req.body;

        const { _id: userId } = req.user; //    Se asume la existencia del usuario dada las verificaciones 
        // debug(`Creating post for user ${username}`); Eliminacion por parte de Douglas por error de servidor
        const post = new Post({

            id: id,

            vin: vin,

            car_name: car_name,
            brand: brand,
            model: model,
            year: year,

            lastMaintenance: lastMaintenance,
    
            kilometers: kilometers,
    

            lastOilChange: lastOilChange,

            lastCoolantChange: lastCoolantChange,

            mayorTuning: mayorTuning,
            minorTuning: minorTuning,
            errorRecord: errorRecord,
            user: userId
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
                                .populate("user", "username email")
                                

        return res.status(200).json({ posts });

    } catch (error) {
        
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor' });
    }
}

controller.findAllHidden = async (req, res) => {
    try {
        const posts = await Post
                                .find({ hidden: true })
                                .populate("user", "username email")
                                

        return res.status(200).json({ posts });
    }catch (error) {
        
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor' });
    }
}





controller.findOwn = async (req, res) => {
    try {
        

        const page = parseInt(req.query.page) || 1; // Obtener el número de página de los parámetros de consulta

        const limit = parseInt(req.query.limit) || 2; // Establecer un límite de elementos por página (por defecto 10)

        const count = await Post.countDocuments({ hidden: false }); // Contar el número de elementos en la colección de los posts, es decir autos guardados


        const { _id: userId } = req.user;

        const posts = await Post
                        .find({ user: userId })
                        .skip((page - 1) * limit) // Saltar los documentos anteriores según la página y el límite
                        .limit(limit) // Limitar el número de documentos por página
                        .populate("user", "username email");

        const totalPages = Math.ceil(count / limit); // Calcular el número total de páginas
                        

        return res.status(200).json({ posts, totalPages, currentPage: page  });

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

        return res.status(200).json({ posts: user.savedPosts.filter(post => !post.hidden)});

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


controller.postUpdate = async (req, res) => {
    try {
        const { identifier: postId } = req.params;

        const { _id: userId } = req.user;

        const {id, vin, car_name, brand, model, year, lastMaintenance, kilometers, lastOilChange, lastCoolantChange, mayorTuning, minorTuning, errorRecord} = req.body;

        const post = await Post.findOne({ _id: postId, user: userId });

        post.id = id;
        post.vin = vin;
        post.car_name = car_name;
        post.brand = brand;
        post.model = model;
        post.year = year;
        post.lastMaintenance = lastMaintenance;
        post.kilometers = kilometers;
        post.lastOilChange = lastOilChange;
        post.lastCoolantChange = lastCoolantChange;
        post.mayorTuning = mayorTuning;
        post.minorTuning = minorTuning;
        post.errorRecord = errorRecord;

        if(!post)
        {
            return res.status(404).json({ error: "Post no encontrado "});
        }

        await post.save();

        return res.status(200).json({ message: "Post actualizado exitosamente!" });

    } catch (error) {
        debug({error});
        return res.status(500).json({ message: 'Error interno de servidor(togglePostUpdate)' });
    }

}




module.exports = controller;