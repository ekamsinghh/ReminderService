const EmailService = require('../services/email-service');

const create = async (req ,res) => {
    try{
        const response= await EmailService.createNotification(req.body);
        return res.status(200).json({
            data: response,
            message: 'Email Reminder set successfully',
            success: true,
            error: {}
        });
    }
    catch(error){
        return res.status(500).json({
            data: {},
            message: 'Failed to setup the email reminder',
            success: false,
            error: error
        });
    }
}

module.exports={
    create
}