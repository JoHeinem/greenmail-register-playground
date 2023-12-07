var unirest = require("unirest");
var req = unirest("POST", "http://localhost:3000/register")
  .headers({
    "Content-Type": "application/json",
  })
  .send(
    JSON.stringify({
      email: "user@testcompany.com",
    })
  )
  .end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
  });
