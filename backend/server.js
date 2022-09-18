require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const todosRoutes = require('./routes/todos');
const userRoutes = require('./routes/user')

const app = express();
// middleware
app.use(express.json());
app.use((req, res, next) => {
    // console.log(req.path , req.method);
    next();
});



// routes
app.use('/api/todos', todosRoutes);
app.use('/api/user', userRoutes);


// connect to db
mongoose.connect(process.env.DB_URL)
.then(() => {

    // listen for requests :)

app.listen(process.env.PORT, () => {
    console.log('connected to DB , Server started on port ' + process.env.PORT);
  });
})
.catch(err => console.log(err));
