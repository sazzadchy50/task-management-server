const express = require('express');
const cors = require('cors');
const app = express();
const port = process.PORT || 5000;



//middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res)=>{
    res.send('Task management is running')
})

app.listen(port, ()=>{
    console.log(`Task Management is running on port ${port}`);
})