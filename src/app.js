const express = require('express')
const { port } = require('./config/config');
const connection = require('./database/connection');

const app = express()

app.use(express.json())

//Start server
app.listen(port, ()=> {
    console.log('Server running on port' , port);
})

app.get('/', (req, res) => {
    res.status(200).json({msg: 'OK'})
})


const authRouter = require('./routes/auth.routes')
const userRouter =  require('./routes/user.routes');

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

//Init BD
connection.authenticate()
    .then( () => {
        console.log('Database Authenticated')
    })
    .catch( err => {
        console.log(err)
    })

connection.sync()
    .then( () => {
        console.log('Database synced')
    })
    .catch(err => {
        console.log(err)
    })