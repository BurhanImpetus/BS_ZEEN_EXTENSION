import React, { useState } from "react";

const ZeenBadge = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="zeen_logo"
      style={{
        zIndex: 5,
        position: "absolute",
        margin: 10,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <img
        src={chrome.runtime.getURL("zeen_logo.png")}
        width="40"
        height="40"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      />
      {isExpanded && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <img
            src={chrome.runtime.getURL("inf_01.png")}
            width="55"
            height="55"
            style={{ margin: 10 }}
          />
          <img
            src={chrome.runtime.getURL("inf_02.png")}
            width="55"
            height="55"
            style={{ margin: 10 }}
          />
          <img
            src={chrome.runtime.getURL("inf_03.png")}
            width="55"
            height="55"
            style={{ margin: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default ZeenBadge;
