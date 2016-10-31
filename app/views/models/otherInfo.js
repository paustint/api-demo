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
                    </p><br><br>
                    <div class="postman-run-button"
                      data-postman-action="collection/import"
                      data-postman-var-1="e39ccc42af65e3927ce9"
                      data-postman-param="env%5BAPI%20Demo%5D=W3sia2V5IjoidXJsIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6Imh0dHBzOi8vYXRnLWFwaS1kZW1vLmhlcm9rdWFwcC5jb20vIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ1c2VyIiwidHlwZSI6InRleHQiLCJ2YWx1ZSI6ImF1c3RpbiIsImVuYWJsZWQiOnRydWV9XQ=="></div>
                      <script type="text/javascript">
                        (function (p,o,s,t,m,a,n) {
                          !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
                          !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
                            (n = o.createElement("script")),
                            (n.id = s+t), (n.async = 1), (n.src = m), n
                          ));
                        }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
                      </script>`
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
