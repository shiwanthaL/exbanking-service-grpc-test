let pbReq = require('../cypress/requests/withdrawReq.json');
const loader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
var fs = require('fs');

/**
 * Testcase : Customer want bank withdraw money by giving bank account details
 * Expected Result : {"fullName":"<name>","prior_amount":"<prior_amount>","current_balance":"<current balance>"}
 * @return {Promise<unknown>}
 */
async function getWithdraw() {
    console.log("===== Start Testcase : /withdraw service functionality ========");
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
        console.log("Loading.. BankingService:withdraw proto definition");
        const client = new BaseProto.BankingService(
            'localhost:9090',
            grpc.credentials.createInsecure()
        )
        console.log("Connection Established : 'localhost:9090' insecure tunnel mode...");
        client.withdraw(pbReq, (err, response) => {

            console.log(client);console.log("");
            console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
            console.log(JSON.stringify(response)+"\n");

            fs.writeFileSync('../cypress/fixtures/withdrawRes.json', JSON.stringify(response), function (err) {
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
        getWithdraw().then(r => {
            console.log("new res", r)
        })
    });
});