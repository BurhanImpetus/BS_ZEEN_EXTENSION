import React from "react";
import { createRoot } from "react-dom/client";
import ZeenBadge from "../screens/ZeenBadge/ZeenBadge";
import ZeenHeader from "../screens/ZeenHeader/ZeenHeader";

/**
 * For rendering Extension on website, after Login
 */
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
   * Add Zeen Badge to product
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