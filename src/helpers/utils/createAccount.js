const Stellar = require('stellar-sdk');
const axios = require('axios');
const fundAccount = async () => {
  const pair = Stellar.Keypair.random()
  try {
    const response = await axios.get(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
    );
    if (response.status === 200) {
      console.log('SUCCESS! You have a new account');
      const account = {
        publicKey: pair.publicKey(),
        secret: pair.secret()
      }
      console.log('account = ', account.publicKey);
      return(account);
    }
  } catch (e) {
    console.error('ERROR!', e);
  }
}
module.exports = fundAccount;
