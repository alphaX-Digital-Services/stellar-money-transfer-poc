const { Server, Networks, Asset, TransactionBuilder, Operation, Keypair } = require('stellar-sdk');

const server = new Server('https://horizon-testnet.stellar.org');

const pathPayment = async (fromUser, toUser, sendAnchor, destAnchor, destAmount, sendMax) => {
  const senderAccount = await server.loadAccount(fromUser.publicKey);
  const sendAsset = new Asset(sendAnchor.assetCode, sendAnchor.publicKey);
  const destAsset = new Asset(destAnchor.assetCode, destAnchor.publicKey);
  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Networks.TESTNET
  };
  const pathPaymentOpts =  {
    sendAsset,
    destination: toUser.publicKey,
    sendMax,
    destAsset,
    destAmount,
    path: [
      new Asset.native()
    ]
  };
  const transaction = new TransactionBuilder(senderAccount, txOptions)
  .addOperation(Operation.pathPayment(pathPaymentOpts))
  .setTimeout(0)
  .build();
  transaction.sign(Keypair.fromSecret(fromUser.secretSeed));
  const response = await server.submitTransaction(transaction);
  return response;
}
module.exports = pathPayment;
