
# Registration testing with greenmail - demo project

This is a demo project how we could use greenmail to achieve the following RFC at UP42:

[[RFC] Bypassing Email Verification for Automated Testing on Console Staging env](https://up42.atlassian.net/wiki/spaces/GIS/pages/3925509507/RFC+Bypassing+Email+Verification+for+Automated+Testing+on+Console+Staging+env)





## Installation Dependencies


Dependencies required:

* docker
* docker-compose
* npm 6+
* node 16+

To install node dependencies, run:

```bash
  npm install
```
    
## Run demo

### Start the e-mail server

Start the greenmail server in the console:
```
docker-compose up
```

This acts as a local e-mail server (smtp+imap) which could simulate the e-mail communication.


### Simulate the up42 registration

Run the following script to start the server:
```
node runServer.js
```

This will start a very simple express server that exposes a simple endpoint:

```
POST http://localhost:3000/register
```

which expects the following body:

```
{
    "email": "some.address@domain.com"
}
```

### Register a user

Run the script:
```
node registerUser.js
```

To register a user with the e-mail adddress `user@testcompany.com`. This will trigger an e-mail to that address that also contains a four digit verification code.

### Fetch the e-mail and print out the verification code

Run the script:
```
node fetchVerificationCode.js
```

which should fetch the (latest) e-mail and print out the verification code if everything went successful. Similar to the following output:

```
Verification code: 8412
```