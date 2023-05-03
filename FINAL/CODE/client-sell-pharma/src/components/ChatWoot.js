import { useEffect } from "react";

const ChatwootWidget = (props) => {
  const {show, data} = props 
  const messageCart =  data?.product?.name

  useEffect(() => {    
    (function(d,t) {
      var BASE_URL="https://app.chatwoot.com";
      var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=BASE_URL+"/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g,s);
      g.onload=function(){
        window.chatwootSDK.run({
          websiteToken: 'JYVb9cPZn2XRZQ7cCnCpat8Z',
          baseUrl: BASE_URL
        })
      }
    })(document,"script");
  }, [show]);
  return null;
};

export default ChatwootWidget;