const express = require('express');
const app = express();
const PostRouter = require('./api/blog/post.router');
const DB_Router = require('./config/db.router');
const { middleware } = require('./auth/middleware');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
});

app.use('/posts', middleware, PostRouter);

app.use('/db', DB_Router);


const PORT = process.env.PORT || 3030;
app.listen(PORT,() => console.info(`Server has started on ${PORT}`));