let pbReq = require('../cypress/requests/createReq.json');
const loader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
var fs = require('fs');

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
        const packageDefinition = loader.loadSync('../pb/proto/banking-service.proto', {
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

            console.log(client);console.log("");
            console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
            console.log(JSON.stringify(response)+"\n");

            fs.writeFileSync('../cypress/fixtures/createRes.json', JSON.stringify(response), function (err) {
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
describe('AAs a customer ' +
    'i want to give my account details ' +
    'So that i can see account balance amount with account details (acct_no, acct_name)', () => {

    it("add processing method to the normal catalog and save", () => {
        createUser().then(r => {
            console.log("new res", r)
        })
    });
});