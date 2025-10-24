require('dotenv').config()

const express = require('express')
const cors = require('cors')
const ConnectDB = require('./config/db.js')
const http = require('http');
const authRoutes = require('./routes/authRoutes.js')
const SkillExchangeRoutes = require('./routes/SkillExchangeRoute.js')
const providerRoutes = require('./routes/providerRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const userDashboardRoutes = require('./routes/userDashboardRoute.js');
const { initSocket } = require('./utils/socket.js');

const app = express()

ConnectDB()

app.use(cors())
app.use(express.json())



app.get('/' , (req , res) => {
    res.send('API RUNNING')
})

app.use('/api/auth' , authRoutes)
app.use('/api/skill-exchange' , SkillExchangeRoutes)
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/user', userDashboardRoutes);


const server = http.createServer(app);
initSocket(server);


const PORT = process.env.PORT || 5000;
app.listen(PORT , () => 
    console.log(`its is running in ${PORT} `)
)

