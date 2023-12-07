const Imap = require("imap");
const simpleParser = require("mailparser").simpleParser;

const imapConfig = {
  user: "user@testcompany.com", // Your email address
  password: "test123", // Your email password
  host: "127.0.0.1", // IMAP server address (e.g., imap.gmail.com for Gmail)
  port: 3143, // IMAP port
  tls: false, // Use TLS/SSL
};

const imap = new Imap(imapConfig);

imap.once("ready", () => {
  imap.openBox("INBOX", true, (err, box) => {
    if (err) throw err;

    imap.search(["ALL"], (searchError, results) => {
      if (searchError) throw searchError;

      const latestEmail = results.pop(); // Get the latest email
      if (!latestEmail) {
        console.log("No emails found.");
        imap.end();
        return;
      }

      const fetch = imap.fetch(latestEmail, { bodies: "" });
      fetch.on("message", (msg) => {
        let emailContent = "";

        msg.on("body", (stream, info) => {
          stream.on("data", (chunk) => {
            emailContent += chunk.toString("utf8");
          });

          stream.once("end", () => {
            simpleParser(emailContent, (parseError, parsed) => {
              if (parseError) throw parseError;

              // Extracting the verification code (assuming it's a 4-digit number)
              const verificationCodeRegex = /\b\d{4}\b/;
              const match = parsed.text.match(verificationCodeRegex);

              if (match) {
                console.log("Verification code:", match[0]);
              } else {
                console.log("No verification code found in the email body.");
              }
            });
          });
        });
      });

      fetch.once("end", () => {
        imap.end();
      });
    });
  });
});

imap.once("error", (err) => {
  console.error(err);
});

imap.once("end", () => {
  console.log("IMAP connection ended");
});

imap.connect();
