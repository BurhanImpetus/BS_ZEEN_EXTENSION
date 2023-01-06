import React, { useState } from "react";

const ZeenHeader = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div
      className="is-fixed"
      style={{ ...style.container, height: isExpanded ? "100px" : "1px" }}
    >
      {isExpanded && (
        <div>
          <img
            src={chrome.runtime.getURL("zeen_white_logo.png")}
            style={style.imageTile}
            width="80"
            height="80"
          />
          <img
            src={chrome.runtime.getURL("inf_01.png")}
            style={style.imageTile}
            width="80"
            height="80"
          />
          <img
            src={chrome.runtime.getURL("inf_02.png")}
            style={style.imageTile}
            width="80"
            height="80"
          />
          <img
            src={chrome.runtime.getURL("inf_03.png")}
            style={style.imageTile}
            width="80"
            height="80"
          />
          <img
            src={chrome.runtime.getURL("inf_04.png")}
            style={style.imageTile}
            width="80"
            height="80"
          />
          <img
            src={chrome.runtime.getURL("inf_05.png")}
            style={style.imageTile}
            width="80"
            height="80"
          />
          <img
            src={chrome.runtime.getURL("inf_06.png")}
            style={style.imageTile}
            width="80"
            height="80"
          />
          <img
            src={chrome.runtime.getURL("collapse.png")}
            style={{
              position: "absolute",
              top: 80,
              left: "50%",
              cursor: "pointer",
              width: 30,
            }}
            width="20"
            height="20"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          />
        </div>
      )}
      <div>
        {!isExpanded && (
          <img
            src={chrome.runtime.getURL("plus.png")}
            style={{
              position: "absolute",
              left: "50%",
              cursor: "pointer",
              width: 30,
            }}
            width="20"
            height="20"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          />
        )}
      </div>
    </div>
  );
};

const style = {
  container: {
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100px",
    backgroundColor: "white",
    paddingLeft: "8%",
    borderBottom: "3px solid #000000",
  },
  imageTile: {
    margin: 10,
  },
};

export default ZeenHeader;
