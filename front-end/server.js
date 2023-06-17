const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'jade');


app.get("/creatingroom",(req,res)=>{

    res.render("");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
