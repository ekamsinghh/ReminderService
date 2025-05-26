const cron = require('node-cron');
const emailService= require('../services/email-service');
const sender = require('../config/email-config');

const setupJobs =async ()=>{
    cron.schedule('*/1 * * * *',async () => {
        const response= await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to:email.recepientEmail,
                subject: email.subject,
                text: email.content
            },async (err,data) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    await emailService.updateNotification(email.id,{status:'SUCCESS'});
                }
            })
        });
        console.log("Emails Sent😊");
    });
}

module.exports = setupJobs