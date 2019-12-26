const { Server, Networks, Asset, TransactionBuilder, Operation, Keypair } = require('stellar-sdk');

const server = new Server('https://horizon-testnet.stellar.org');
const changeTrust = async (userAccount, Anchor, limitOfTrust) => {
  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Networks.TESTNET
  };
  const distributorAccount = await server.loadAccount(userAccount.publicKey);
  const newAsset = new Asset(Anchor.assetCode, Anchor.publicKey);
  const changeTrustOpts = {
    asset: newAsset,
    limit: limitOfTrust
  };
  const transaction = new TransactionBuilder(distributorAccount, txOptions)
  .addOperation(Operation.changeTrust(changeTrustOpts))
  .setTimeout(0)
  .build();
  transaction.sign(Keypair.fromSecret(userAccount.secretSeed));
  const result = await server.submitTransaction(transaction);
  return result;
};

module.exports = changeTrust;
