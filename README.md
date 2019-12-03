# Chrome78WebWorkerXmlHttpRequestBug
Repository showing the Chrome 78 web worker bug when sending XmlHttpRequests

Bug report can be found here:
https://bugs.chromium.org/p/chromium/issues/detail?id=1029715

The reproduction steps below assumes you use Node.js 8.X on Windows 10. You can probably use whatever you find suitable though.

-----------------------------------------------------------------------------------------------------------
Initial steps:
1. Clone the repository (git clone https://github.com/DDowell/Chrome78WebWorkerXmlHttpRequestBug.git)
2. Install the required node pacakges (npm install)
3. Run the server script (node server.js)
4. Navigate to localhost:8080/index.html in Chrome 78.

-----------------------------------------------------------------------------------------------------------
Steps to reproduce the debugger issue:
1. Open the Chrome Dev Tools and go to the source tab.
2. Set a break point in the index.html source file on line X and another one on line Y.
3. Press the "WWPOST" button on the web page.
4. Observe the behavior of Chrome dev tools at breakpoint on line X
5. Continue running the script until breakpoint on line Y hits.
6. Observe the behavior of Chrome dev tools at breakpoint on line Y.

-----------------------------------------------------------------------------------------------------------
Steps to reproduce the cogwheel issue:
1. Navigate to the network tab in the Chrome Dev tools.
2. Press the "WWPOST" button on the web page. This will send a POST request to the server in a web worker thread
3. Observe that the response is marked as 200 OK but the response body cannot be displayed and the cogwheel is still there even though the request has been fulfilled.

-----------------------------------------------------------------------------------------------------------
Steps to reproduce the throttling issue:
1. Navigate to the network tab in the Chrome Dev tools and set the network tab's throttling setting to Offline.
2. Press "WWPOST" button on the web page. This will send a POST request to the server in a web worker thread.
3. Note that the request goes through even though we are "offline".
4. Press "STPOST". This will make a POST request to the server on the main thread.
5. Note that the request fails as expected.
DISCLAIMER: I actually has not been able to reproduce this bug in this simple test. It does fail in our main application though with similar steps taken (albeit in a much more complex environment).