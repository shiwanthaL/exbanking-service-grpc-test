let pbReq = require('../cypress/requests/depositReq.json');
const loader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
var fs = require('fs');
const {expect} = require("chai");
const pbRes = require("../cypress/fixtures/depositRes.json");


describe('As a customer ' +
    'I want to give my account details ' +
    'So that i can make money deposit into my saving account (name, amount)', () => {

    it("Successfully deposit to given bank account and verify deposit amount is correct", () => {
        console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
        getDeposit().then(r => {
            console.log("new res", r)
        })
    });
});



/**
 * Testcase : Customer want bank deposit money by giving bank account details
 * Expected Result : {"fullName":"<name>","prior_amount":"<prior_balance>","current_balance":"<current_balance>"}
 * @return {Promise<unknown>}
 */
async function getDeposit() {
    console.log("===== Start Testcase : /deposit service functionality ========");
    console.log("Protobuf Request Payload is");
    console.log(pbReq);
    return new Promise(function (resolve) {
        const packageDefinition = loader.loadSync('./pb/proto/banking-service.proto', {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });
        const BaseProto = grpc.loadPackageDefinition(packageDefinition);
        console.log("Loading.. BankingService:deposit proto definition");
        const client = new BaseProto.BankingService(
            'localhost:9090',
            grpc.credentials.createInsecure()
        )
        console.log("Connection Established : 'localhost:9090' insecure tunnel mode...");
        client.deposit(pbReq, (err, response) => {

            console.log(client);console.log("");
            console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
            console.log(JSON.stringify(response)+"\n");

            fs.writeFileSync('./cypress/fixtures/depositRes.json', JSON.stringify(response), function (err) {

                //Response validation with Chai.expect() assertion
                expect(pbRes.fullName).to.be.equal(pbReq.fullName);

                if (err != null) {
                    console.log("RECEIVED GRPC SUCCESSFUL SERVICE RESPONSE");
                }else{
                    throw err;
                }
                resolve(response)
            });
        });
    });
}
