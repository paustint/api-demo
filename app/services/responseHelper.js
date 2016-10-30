(function(){
  'use strict';
  var ApiLog = require('../models/apiLog');

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
          if (req.params.user) req.apiLog.user = req.params.user;
          req.apiLog.params = req.params;
          req.apiLog.responseStatus = status;
          
          req.apiLog.stopTime = Date.now();
          if (req.apiLog.startTime) req.apiLog.duration = req.apiLog.stopTime - req.apiLog.startTime;

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
