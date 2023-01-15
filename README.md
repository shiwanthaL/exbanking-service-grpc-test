# exbanking-service-grpc-test
*exbanking-service-grpc-test* automated suite will maintain Exbanking service grpc functional test cases. This gRPC functional test automation project is a combination of JavaScript programming language and Cypress.io In addition, to enable a grpc mock  client, a customized solution with @grpc/proto-loader and @grpc/grpc-js npm lib are being used in this async test automation platform.

## Project demo gRPC protobuf API functional testing with Cypress.io + Grpc/grpc-js

<p align="center">
  <a href="https://vimeo.com/manage/videos/789461649">
    <img alt="Exbank gRPC (Functional Test) with K6" src="cypress/support/img_1.png" width="100%" height="50%" />
  </a>
</p>


## Step 01 : Clone gRPC Automated Functional Test Project
Clone [exbanking-service-grpc-test](https://github.com/shiwanthaL/exbanking-service-grpc-test) github project in your running machine
```bash
> git clone https://github.com/shiwanthaL/exbanking-service-grpc-test.git
```
Prerequisites:
```bash
Java JDK  (Support Java 11 or above)
Node.js
```

### Project structure 
Understand gRPC functional service test project major folder hierarchy 
![img.png](cypress/support/strucure.png)
## Step 02 : gRPC Server Setup and Installation
As a Prerequisite to execute functional testcases, please follow below instructions to get up and running Exbank gRPC endpoint,

1. Open separate bach (cmd) window on project root directory

2. Get up and running gRPC service endpoints using below command (***Don't close terminal until testcases execution complete***)
```bash
> java -jar exbanking-service-protobuf-endpoints.jar
```
![img.png](cypress/support/img.png)

## Step 03 : Execute Exbank service level functional testcases

Make sure installed NodeJS already setup in running machine
```bash
> node -v
```
Open new bash terminal and go to **exbanking-service-grpc-test root directory** using separate bash and execute below commands
```bash
> npm install
```
Execute Exbanking service level smoke test suite
```bash
> npm run test
```
![img.png](cypress/support/img-result.png)

## Step 04 : Analysis Execution Result
Execution result will gererate under root directory folder called "YOLOReport"
Open result.html file in browser

![img.png](cypress/support/report.png)


**Note:** This framework supporting features,
1. HTTP2 Protobuf type gRPC service end points testing :white_check_mark:
2. Connect with gRPC server via Unery calls :white_check_mark:
3. Execution summary reports :white_check_mark:
4. Test Suite and test plan management :white_check_mark:
5. Support CI/CD integrated execution :white_check_mark:
6. Enabled cypress.io feature with API suite :white_check_mark:

NPM Used major libraries

[@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js)  |  [@grpc/proto-loader](https://www.npmjs.com/package/@grpc/proto-loader)  |  [node-grpc-client](https://www.npmjs.com/package/node-grpc-client)  |  [cypress-protobuf](https://www.npmjs.com/package/cypress-protobuf)  |  [mocha](https://www.npmjs.com/package/mocha)


## License
[MIT](https://choosealicense.com/licenses/mit/)
