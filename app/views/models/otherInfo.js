(function(){
  'use strict';
    
    // Made into function to make sure that order of variable declation does not matter
    exports.getOtherInfo = getOtherInfo;

    
    function getOtherInfo() {
      return otherInfo;
    }

    var otherInfo = {
      heading: `Miscellaneous information lives on this page`,
      id: 'other-info',
      info: [
        {
          title: 'Postman Colleantion',
          id: 'postman-collection',
          content: `<p>
                      The following is a postman collection that will be imported mid-way in the training course.<br>
                      If you are a member of the shared postman for teams, you can access this on the team section within postman.<br>
                      <a href="https://www.getpostman.com/collections/e39ccc42af65e3927ce9"> 
                          Postman Collection<Br>
                          https://www.getpostman.com/collections/e39ccc42af65e3927ce9
                      </a>
                    </p>`
        },
        {
          title: 'Postman Environment',
          id: 'postman-environment',
          content: `<p>
                      Setup a new environment in postmant and you can paste in the following to the <code>Bulk Edit</code> section, make sure to put in a unique value for the user parameter<br>
<pre>url:https://atg-api-demo.herokuapp.com/
user:uniqueNameHere</pre>
                    </p>`
        }
      ]
    }

})();
