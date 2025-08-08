const { PrismaClient } = require('../generated/prisma');
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();




exports.home = (req,res)=>{
    res.send("Home")
}

exports.login = (req,res)=>{
    
    res.send(`admin login`)
}



exports.signin = (req,res)=>{
    
    res.send(`admin signin`)
}

exports.signin_post = async (req,res)=>{
    
    const {username , password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create(
        {
            data : {
                username,
                password : hashedPassword
                
            }
        }
    )
    
    res.status(201).json(
        {
            message : "User created succesfully",
            user : newUser
        }
    )

}

exports.posts = async (req,res)=>{
     const posts = await prisma.post.findMany()

    res.status(201).json({
        message : "all posts fetched",
        posts : posts
    })
}

exports.comments = async (req,res)=>{
     const comments = await prisma.comment.findMany(
        {
            where : {
                PostID : parseInt(req.params.postId,10)
            }
        }
     )

    res.status(201).json({
        message : "all comments fetched",
        comments : comments
    })
}


exports.post_get = async (req,res)=>{
     const post = await prisma.post.findUnique(
        {
            where : {
                id : parseInt(req.params.postId,10)
            }
        }
     )

    res.status(201).json({
        message : "post fetched",
        post : post
    })
}

exports.comment_get = async (req,res)=>{
     const comment = await prisma.comment.findUnique(
        {
            where : {
                id : parseInt(req.params.commentId,10)
            }
        }
     )

    res.status(201).json({
        message : "comment fetched",
        comment : comment
    })
}


exports.post_add = async (req,res)=>{

    
    const {title , text , username , published} = req.body

    const User = await prisma.user.findUnique(
        {
            where : {
                username : username
        
        }}
    )

    const newPost = await prisma.post.create(
        {
            data : {
                title,
                text,
                UserID : User.id,
                published
            }
        }
    )
    
    res.status(201).json(
        {
            message : "Post created succesfully",
            post : newPost
        }
    )
}

exports.post = async (req,res)=>{
    
     const post = await prisma.post.findUnique(
        {
            where : {
                id : parseInt(req.params.postId,10)
            }
        }
     )

    res.status(201).json({
        message : "post fetched succesfully",
        post : post
    })
}

exports.post_edit = async (req,res)=>{

    

    const {title , text , UserID , published} = req.body
    
    const post = await prisma.post.update(
        {
            where : {
                id : parseInt(req.params.postId,10)
            },

            data : {
                title,
                text,
                UserID,
                published
            }
        }
     )

    res.status(201).json({
        message : "post edited succesfully",
        post : post
    })
}

exports.post_delete = async (req,res)=>{
    
    const deletedPost = await prisma.post.delete(
        {where : {

            id : parseInt(req.params.postId)

        }}
    )

    res.status(201).json(
        {
            message : "post deleted succesfully",
            post : deletedPost
        }
    )
}


exports.comment_edit =async (req,res)=>{
    
   
    const {text} = req.body

    console.log(req.params)
    
    const comment = await prisma.comment.update(
        {
            where : {
                id : parseInt(req.params.commentId,10)
            },

            data : {
              
                text,
               
            }
        }
     )

    res.status(201).json({
        message : "post edited succesfully",
        post : comment
    })
}

exports.comment_delete = async (req,res)=>{
    
    const deletedComment = await prisma.comment.delete(
        {where : {

            id : parseInt(req.params.commentId)

        }}
    )

    res.status(201).json(
        {
            message : "comment deleted succesfully",
            comment : deletedComment
        }
    )
}

exports.comment_add = async (req,res)=>{
    
    const {text, UserID} = req.body

    const newComment = await prisma.comment.create(
        {
            data : {
                text,
                PostID : parseInt(req.params.postId,10),
                UserID
            }
        }
    )
    
    res.status(201).json(
        {
            message : "comment created successfully",
            comment : newComment
        }
    )
}