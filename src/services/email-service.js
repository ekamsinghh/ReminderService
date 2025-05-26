const sender = require('../config/email-config');

const sendBasicEmail = (mailFrom,mailTo,mailSubject,mailBody) => {
    //* try-catch is not necessary here but it's good practice to handle potential errors
    try{
        //* there is no such necessity to await here as if the promise isn't resolved instantly then also it's ok since it will serve as reminder email so no need to instantly resolve but it is better practice if you do AWAIT !
        //* using await will halt the other process for time being and it is not necessary that the email got sent immediately i can take some time and to not to stop any other process we avoid doing await
        sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject : mailSubject,
            text : mailBody
        });        
    }
    catch(error){
        console.log(error);
    }
}


module.exports={
    sendBasicEmail
}