const express = require('express');
const { PORT, REMINDER_BINDING_KEY } = require('./config/server-config');
const EmailService = require('./services/email-service');
const {createChannel , subscribeMessage}= require('./utils/messageQueue');
// const { sendBasicEmail } = require('./services/email-service');
const apiRoutes = require("./router/index");
const jobs= require('./utils/job');

const setupAndStartServer= async () => {
    const app=express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api",apiRoutes);
    const channel=await createChannel();
    app.listen(PORT,()=>{
        console.log(`Server started on port ${PORT}`);
        subscribeMessage(channel,EmailService.subscribedEvents,REMINDER_BINDING_KEY);
        // jobs();

        // sendBasicEmail(
        //     'support@admin.com',
        //     'xyzflips24@gmail.com',
        //     'Flight Details',
        //     'Hey, I hope you are doing well.\nPlease find the flight details attached and thankyou for travelling with us.😊'
        // );
    });
    
}

setupAndStartServer();