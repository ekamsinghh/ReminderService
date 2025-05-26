const express = require('express');
const { PORT } = require('./config/server-config');
// const { sendBasicEmail } = require('./services/email-service');
const apiRoutes = require("./router/index");
const jobs= require('./utils/job');

function setupAndStartServer(){
    const app=express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api",apiRoutes);

    app.listen(PORT,()=>{
        console.log(`Server started on port ${PORT}`);
        
        jobs();

        // sendBasicEmail(
        //     'support@admin.com',
        //     'xyzflips24@gmail.com',
        //     'Flight Details',
        //     'Hey, I hope you are doing well.\nPlease find the flight details attached and thankyou for travelling with us.😊'
        // );
    });
    
}

setupAndStartServer();