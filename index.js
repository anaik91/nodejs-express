const express = require('express');
const courses = require('./routes/courses')
const index = require('./routes/index')
const db = require('./config/db')

const app = express();
app.use(express.json());

app.use('/',index)
app.use('/api/courses',courses)

app.get('/',(req,res)=>{
    res.send({
        status: 'OK'
    })
})

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Listening on port ${port} ! `)
});