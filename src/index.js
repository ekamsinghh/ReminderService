const express = require('express');
const { PORT , DB_SYNC } = require('./config/server-config');
// const db = require('./models/index');

function setupAndStartServer(){
    const app=express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(PORT,()=>{
        console.log(`Server started on port ${PORT}`);
    });

    if(DB_SYNC){
        db.sequelize.sync({alter:true});
    }
}

setupAndStartServer();