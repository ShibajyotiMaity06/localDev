require('dotenv').config()

const express = require('express')
const cors = require('cors')
const ConnectDB = require('./config/db.js')
const authRoutes = require('./routes/authRoutes.js')
const SkillExchangeRoutes = require('./routes/SkillExchangeRoute.js')

const app = express()

ConnectDB()

app.use(cors())
app.use(express.json())



app.get('/' , (req , res) => {
    res.send('API RUNNING')
})

app.use('/api/auth' , authRoutes)
app.use('/api/skill-exchange' , SkillExchangeRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => 
    console.log(`its is running in ${PORT} `)
)

