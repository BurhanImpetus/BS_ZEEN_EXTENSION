import React from "react";
import { createRoot } from "react-dom/client";
import ZeenBadge from "../screens/ZeenBadge/ZeenBadge";
import ZeenHeader from "../screens/ZeenHeader/ZeenHeader";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case "renderExtension":{
      sendResponse("Please render Extension")
      renderExtension()
    }
      break;
  }
});

chrome.storage.sync.get(["isUserLoggedIn"]).then((response) => {
  if(response.isUserLoggedIn){
    renderExtension()
  }
})

const renderExtension = () => {
  /**
   * Add Zeen Header to page
   */
  const jcrew_header = document.getElementsByClassName("nc-nav__nav-bar");

  const newChildNode = document.createElement("div");
  jcrew_header[0]?.insertBefore(newChildNode, jcrew_header[0]?.firstChild);
  const root = createRoot(newChildNode);
  root.render(<ZeenHeader />);

  /**
   * Add Zeen Badge to producst
   */

  const jcrew_products = document.getElementsByClassName(
    "ProductImage__photos___6-WsT"
  );

  const createZeenElement = (product) => {
    const newChildNode = document.createElement("div");
    product?.insertBefore(newChildNode, product?.firstChild);
    const root = createRoot(newChildNode);
    root.render(<ZeenBadge />);
  };

  for (const product of jcrew_products) {
    createZeenElement(product);
  }
};

// const root = document.createElement('div');
// document.body.appendChild(root);
// ReactDOM.render(<div>Hello World</div>, root)

// var toolbarHeight = 50;

// var div = document.createElement("div");
// div.id = "myToolbar";
// div.textContent = "I am the toolbar !";

// var st = div.style;
// st.display = "block";
// st.zIndex = "9999";
// st.position = "absolute";
// div.className="nc-nav__nav-bar is-fixed"
// div.className="nc-nav_nav-bar--inner fixed"
// div.className="navbar fixed-top navbar-expand-sm navbar-light bg-white"
// div.className="navbar-fixed-top"
// div.className="bstool"

// var st = div.style;
// st.display = "block";
// st.top = "0px";
// st.left = "0px";
// st.width = "100%";
// st.height = toolbarHeight + "px";
// st.background = "#C2E2FF";
// st.color = "grey";
// st.fontStyle = "italic";
// st.position = "fixed";

// document.documentElement.appendChild(<ZeenHeader />);

// const div = document.createElement('div')
// div.id = "bsZeenDiv";

// // var st = div.style;
// // st.display = "block";
// // st.top = "0px";
// // st.left = "0px";
// // st.width = "100%";
// // st.height = "100px";
// // st.background = "#C2E2FF";
// // st.color = "grey";
// // st.fontStyle = "italic";
// // st.position = "fixed";
// document.body.appendChild(div)
// document.body.style.transform = "translateY(53px)";
// const root = createRoot(document.getElementById("bsZeenDiv"));
// root.render(<ZeenHeader />);

// ReactDOM.render(<ZeenHeader />, root)

// const tt = document.getElementById("app-view")
// tt.insertBefore(div, tt.firstChild)

// const createZeenElement = (ttt) => {
// //   var div = document.createElement("div");
// //   div.id = "myToolbar";
// //   div.textContent = "I am the toolbar !";
// //   var st = div.style;
// //   st.display = "block";
// //   st.zIndex = "9999";
// //   st.position = "absolute";

// const newChildNode = document.createElement('div')
// newChildNode.id = 'new-child-node'
// ttt?.insertBefore(newChildNode, ttt?.firstChild);

// // ReactDOM.render(<ZeenBadge />, newChildNode)
// const root = createRoot(newChildNode);
// root.render(<ZeenBadge />);

// //   ttt?.insertBefore(<ZeenBadge/>, ttt?.firstChild);
// };

// const tt = document.getElementsByClassName("ProductImage__photos___6-WsT");
// console.log("bslog listener fired.: " + tt);
// // tt[0]?.appendChild(div)
// for (const ttt of tt) {
//     createZeenElement(ttt)
// }

// function listener()
// {
//     const tt = document.getElementById("ProductImage__photos___6-WsT")
//     console.log("bslog listener fired.: "+ tt);
//     tt?.appendChild(div)
// }

// var timeout = null;
// document.addEventListener("DOMSubtreeModified", function() {
//     if(timeout) {
//         clearTimeout(timeout);
//     }
//     timeout = setTimeout(listener, 500);
// }, false);

// const ttt = document.getElementsByClassName("nc-nav__nav-bar is-fixed")
// console.log('bslog tt: '+ tt)
// console.log('bslog ttt: '+ ttt)
// if(ttt[0] != null){
//     ttt[0].appendChild(div)
// }else{
//     tt.insertBefore(div, tt.firstChild)
// }
