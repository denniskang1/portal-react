import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import {
  isAndroid,
  isWinPhone,
  isIOS,
  isMobile,
  mobileVendor,
  mobileModel,
} from "react-device-detect";
const publicIp = require("public-ip");

function App() {
  const [apiResponse, resChange] = useState("");
  const [OS, changeInfo] = useState("");
  const [IP, getIP] = useState("");
  (async () => {
    getIP(await publicIp.v4());
  })();
  function web(url) {
    var OSName = "Unknown OS";
    if (!isMobile) {
      if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
      if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
      if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";
    } else {
      if (isAndroid) OSName = "Android";
      else if (isWinPhone) OSName = "WinPhone";
      else if (isIOS) OSName = "IOS";
    }
    changeInfo(OSName);
    window.open(url);
    (async () => {
      getIP(await publicIp.v4());
    })();
    var json = { url: url, access: 0, OS: OS, ip: IP };
    if (isMobile) {
      var json = {
        manufacturer: mobileVendor,
        model: mobileModel,
        url: url,
        access: 1,
        OS: OS,
        ip: IP,
      };
    }
    fetch("http://192.168.56.1:9000/testAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.text())
      .then((res) => resChange(res));
  }
  function query() {
    (async () => {
      getIP(await publicIp.v4());
    })();
    var json = { access: 10, ip: IP };
    if (isMobile) {
      json = { access: 11, ip: IP };
    }
    fetch("http://192.168.56.1:9000/testAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.text())
      .then((res) => resChange(res));
  }
  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={() => web("http://naver.com")}>
          Naver
        </button>
        <br></br>
        <button type="button" onClick={() => web("https://www.daum.net")}>
          Daum
        </button>
        <br></br>
        <button type="button" onClick={() => web("https://www.nate.com")}>
          Nate
        </button>
        <br></br>
        <button type="button" onClick={() => query()}>
          사용 내역 검색
        </button>
        <br></br>
        <p className="App-intro" style={{ "font-size": "15px" }}>
          {apiResponse}
        </p>
      </header>
    </div>
  );
}

export default App;
