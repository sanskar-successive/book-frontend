const scanner = require("sonarqube-scanner");
const userToken='squ_563653d2035aa63b42d0cdea368c5b0124ec0081'
scanner(
  {
    serverUrl: "http://localhost:9000",
   
    token: userToken,
    options: {
      "sonar.sources": "./src",
    },
  },
  () => process.exit()
);