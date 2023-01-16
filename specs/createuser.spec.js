let pbReq = require('../cypress/requests/createReq.json');
const loader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
const expect = require('chai').expect
let pbRes = require('../cypress/fixtures/createRes.json');
var fs = require('fs');


describe('As a customer ' +
    'I want to give my personal details to create bank account ' +
    'So that i make transactions via bank account (name, email, passport)', () => {

    it("Successfully create customer bank account", () => {
        console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
        createUser().then(r => {
            console.log("new res", r)
        })
    });
});



/**
 * Testcase : Customer create new bank account by giving own personal details
 * Expected Result : {"fullName":"<>","accountNo":"<>>","ibanNo":"<>>","swiftCode":"<>>","bankName":"<>>","branchName":"<>>","balance":"<>>","email":"<>","passport":"<>"}
 * @return {Promise<unknown>}
 */
async function createUser() {
    console.log("===== Start Testcase : /createUser service functionality ========");
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
        console.log("Loading.. BankingService:create_user proto definition");
        const client = new BaseProto.BankingService(
            'localhost:9090',
            grpc.credentials.createInsecure()
        )
        console.log("Connection Established : 'localhost:9090' insecure tunnel mode...");
        client.create_user(pbReq, (err, response) => {
            console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
            console.log(JSON.stringify(response)+"\n");



            fs.writeFileSync('./cypress/fixtures/createRes.json', JSON.stringify(response), function (err) {

                //Response validation with Chai.expect() assertion
                expect(pbRes.fullName).to.be.equal(pbReq.fullName);
                expect(pbRes.passport).to.be.equal(pbReq.passport);
                expect(pbRes.email).to.be.equal(pbReq.email);

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



