const express = require('express');
const courses = require('./routes/courses')
const index = require('./routes/index')
const ui = require('./routes/ui')

const app = express();
app.use(express.json());

app.use('/',ui)
app.use('/healthz',index)
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