const express = require("express")
const jwt = require('jsonwebtoken');
const passport = require('passport');
const controller = require("./controller");
const  cors = require('cors')
const { PrismaClient } = require("../generated/prisma");
require('dotenv').config();
const prisma = new PrismaClient();

require('./passport')(passport);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());


app.get("/",controller.home)


app.post("/signin",controller.signin_post)



app.post("/login", async (req,res)=>{

    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where : {
            username
        }
    })

    if(!user){
        return res.status(401).json({
            message : "user doesnt exist"
        })
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

    res.json({ token });

})


/*

app.get("/signin",controller.signin)

app.get("/login",controller.login)


*/

app.post("/post/new",passport.authenticate('jwt', { session: false }),controller.post_add)

app.get("/posts",controller.posts)

app.get("/post/:postId",controller.post_get)


app.post("/post/:postId",passport.authenticate('jwt', { session: false }),controller.post)

app.put("/post/:postId",passport.authenticate('jwt', { session: false }),controller.post_edit)

app.delete("/post/:postId",passport.authenticate('jwt', { session: false }),controller.post_delete)



app.post("/post/:postId/comment/new",controller.comment_add)

app.get("/post/:postId/comments",controller.comments)

app.get("/post/:postId/comment/:commentId",controller.comment_get)



app.put("/post/:postId/comment/:commentId",controller.comment_edit)

app.delete("/post/:postId/comment/:commentId",passport.authenticate('jwt', { session: false }),controller.comment_delete)



app.listen("3000",()=>{
    console.log("listening")
})