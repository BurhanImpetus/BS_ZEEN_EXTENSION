import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    chrome.storage.sync
      .get(["userEmail", "isUserLoggedIn"])
      .then((response) => {
        setEmail(response.userEmail);
        setIsLoggedIn(response.isUserLoggedIn);
      });
  }, []);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      setHasError(true);
    } else {
      chrome.storage.sync
        .set({ userEmail: email, isUserLoggedIn: true })
        .then(() => {
          setHasError(false);
          setIsLoggedIn(true);
          window.close();
          chrome.tabs.query({}, function (tabs) {
            tabs.map((item) => {
              if (item.url.includes("jcrew.com")) {
                chrome.tabs.sendMessage(
                  item?.id,
                  { type: "renderExtension" },
                  function (response) {
                    console.log(
                      "bslog, extension rendered with response: " + response
                    );
                  }
                );
              } else {
                console.log("bslog jcrew webiste is not open");
              }
            });
          });
        })
        .catch((error) => {
          console.log("bslog error: " + error);
        });
    }
  };

  const handleLogout = () => {
    chrome.storage.sync
      .set({ userEmail: "", isUserLoggedIn: false })
      .then(() => {
        setIsLoggedIn(false);
        window.close();
        chrome.tabs.query({}, function (tabs) {
          tabs.map((item) => {
            if (item.url.includes("jcrew.com")) {
              chrome.tabs.reload(item?.id);
            } else {
              console.log("bslog jcrew webiste is not open");
            }
          });
        });
      });
  };

  const renderLoginForm = () => {
    return (
      <div style={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type={"email"}
            placeholder={"Registered email ID"}
            style={style.textFieldStyle}
            value={email}
            onChange={handleEmail}
          />
          <input
            name="password"
            type={"password"}
            placeholder={"Password"}
            style={style.textFieldStyle}
            value={password}
            onChange={handlePassword}
          />
          {hasError && (
            <span style={style.errorSpanStyle}>Need credentials.</span>
          )}
          <div>
            <button
              type="submit"
              style={{ ...style.buttonStyle, marginTop: hasError ? 10 : 33 }}
            >
              SIGN IN
            </button>
          </div>
        </form>
        <div style={style.checkBoxContainer as React.CSSProperties}>
          <input
            className={rememberMe ? "checked" : ""}
            name="rememberMe"
            type={"checkbox"}
            style={style.checkBoxStyle as React.CSSProperties}
            value="Remember Me"
            checked={rememberMe}
            onChange={handleRememberMe}
          />
          <span style={style.checkBoxTextStyle}>
            Keep me Signed-in on this broswer
          </span>
        </div>
      </div>
    );
  };

  const renderSignoutView = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
        <span style={style.userNameStyle}>{email}</span>
        <span style={style.userNameStyle}>
          You have been saved on this browser
        </span>
        <div>
          <button
            type="submit"
            style={{ ...style.buttonStyle, marginTop: 60 }}
            onClick={() => {
              handleLogout();
            }}
          >
            SIGN OUT
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={style.mainContainer}>
      <div style={style.logoContainer as React.CSSProperties}>
        <img src="zeen_white_logo.png" height={40} width={40} />
        <span style={style.zeenHeaderStyle}>zeen</span>
      </div>
      {isLoggedIn ? renderSignoutView() : renderLoginForm()}
      <div style={style.bottomLinkContainer as React.CSSProperties}>
        <span style={style.bottomTextStyle}>Terms of Use</span>
        <span style={style.bottomTextStyle}>Privacy Policy</span>
        <span style={style.bottomTextStyle}>Zeen Business</span>
      </div>
    </div>
  );
};

const style = {
  mainContainer: { width: 300, height: 350, padding: 30 },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  formContainer: { marginTop: 10 },
  textFieldStyle: {
    width: "100%",
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonStyle: {
    backgroundColor: "black",
    height: 40,
    color: "white",
    fontSize: 16,
    borderRadius: 5,
    marginTop: 10,
    cursor: "pointer",
    paddingLeft: 15,
    paddingRight: 15,
  },
  bottomTextStyle: {
    fontSize: 13,
    fontWeight: "bold",
    cursor: "pointer",
  },
  zeenHeaderStyle: {
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 22,
    letterSpacing: 1,
  },
  errorSpanStyle: {
    display: "flex",
    color: "maroon",
    fontSize: 15,
    justifyContent: "center",
    marginTop: 5,
  },
  checkBoxContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  checkBoxStyle: {
    width: 25,
    height: 25,
    cursor: "pointer",
    appearance: "none",
    border: "0.1em solid #000000",
    borderRadius: 5,
  },
  checkBoxTextStyle: { marginLeft: 10, fontSize: 14 },
  bottomLinkContainer: {
    display: "flex",
    width: "80%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 40,
  },
  userNameStyle: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
  },
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
