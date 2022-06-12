const schedule = require('node-schedule');



module.exports = () => schedule.scheduleJob('0 0 * * *', function(){
  //funcionalidade periódia de atualização da last_message em cada subscription
});


