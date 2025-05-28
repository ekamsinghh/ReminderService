const sender = require('../config/email-config');
const EmailRepository = require('../repository/email-repository');

const emailRepository= new EmailRepository();
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

//* fetch all the emails which are pending before this timestamp
const fetchPendingEmails= async () => {
    try{
        const response= await emailRepository.get({status: 'PENDING'});
        return response;
    }
    catch(error){
        console.log(error);
    }
}

const createNotification = async (data) =>{
    try{
        const response=await emailRepository.create(data);
        return response;
    }
    catch(error){
        throw error;
    }
}

const updateNotification=async (ticketId,data)=>{
    try{
        const response=await emailRepository.update(ticketId,data);
        return response;
    }
    catch(error){
        throw error;
    }
}

const subscribedEvents=async(payload) => {
    let service=payload.service;
    let data=payload.data;
    switch(service){
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            sendBasicEmail(data);
            break;
        default:
            console.log("No Valid Event Recieved");
            break;
    }
}

module.exports={
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateNotification,
    subscribedEvents
}