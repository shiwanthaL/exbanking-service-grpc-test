let pbReq = require('../cypress/requests/sendReq.json');
const loader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
var fs = require('fs');


describe('As a customer ' +
    'I want to give bank beneficiary details and amount' +
    'So that i make online transfer to beneficiary account (name , amount, to_account, remark)', () => {

    it("Successfully make transfer to beneficiary bank account", () => {
        console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
        getSend().then(r => {
            console.log("new res", r)
        })
    });
});




/**
 * Testcase : Customer want to make money transfer by giving beneficiary account details
 * Expected Result : {"from_account":"<my_acc>","beneficiary_account":"<beneficiary_acc>","transaction_remark":"<remark>","reference_no":"<ref>","transfer_amount":"<amount>>","current_balance":"<current_balance>"}
 * @return {Promise<unknown>}
 */
async function getSend() {
    console.log("===== Start Testcase : /send service functionality ========");
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
        console.log("Loading.. BankingService:send proto definition");
        const client = new BaseProto.BankingService(
            'localhost:9090',
            grpc.credentials.createInsecure()
        )
        console.log("Connection Established : 'localhost:9090' insecure tunnel mode...");
        client.send(pbReq, (err, response) => {

            console.log(client);console.log("");
            console.log("<-- <-- <-- <-- Found Response --> --> --> --> ");
            console.log(JSON.stringify(response)+"\n");

            fs.writeFileSync('./cypress/fixtures/sendRes.json', JSON.stringify(response), function (err) {
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
