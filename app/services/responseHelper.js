(function(){
  'use strict';
  var ApiLog = require('../models/ApiLog');

  exports.sendJson = function(req, res, status, content) {
      content = content || {};
      res.status(status);
      saveApiLog(req, status);
      return res.json(content);
};

    
    exports.saveApiLog = saveApiLog;

    // Do not wait for async save to take place, also do not inform user if error
    function saveApiLog(req, status) {
      try {
        if (req.apiLog) {
          req.apiLog.stopTime = Date.now();
          if (req.apiLog.startTime) {
            req.apiLog.duration = req.apiLog.stopTime - req.apiLog.startTime;
          }
          req.apiLog.responseStatus = status;
          req.apiLog.save((err) => {
            if (err) console.log('error saving apiLog');
            console.log('saved API log');
          });
        }
      } catch (ex) {
        if (ex) console.log('exception saving apiLog - ' + ex);
      }
    }

})();
