let pbReq = require('../cypress/requests/balanceReq.json');
const loader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
var fs = require('fs');

/**
 * Testcase : Customer verify bank account balance using own account details
 * Expected Result : {"fullName":"<full_name>>","accountNo":"<account_no>,"balance":"<balance>"}
 * @return {Promise<unknown>}
 */
async function getBalance() {
    console.log("===== Start Testcase : /getBalance service functionality ========");
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
        console.log("Loading.. BankingService:get_balance proto definition");
        const client = new BaseProto.BankingService(
            'localhost:9090',
            grpc.credentials.createInsecure()
        )
        console.log("Connection Established : 'localhost:9090' insecure tunnel mode...");
        client.get_balance(pbReq, (err, response) => {

            console.log(client);console.log("");
            console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
            console.log(JSON.stringify(response)+"\n");

            fs.writeFileSync('../cypress/fixtures/balanceRes.json', JSON.stringify(response), function (err) {
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
describe('As a customer ' +
    'i want to give my account details ' +
    'So that i can see account balance amount with account details (acct_no, acct_name)', () => {

    it("add processing method to the normal catalog and save", () => {
            getBalance().then(r => {
                console.log("new res", r)
            })
    })
})