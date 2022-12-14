class TokenStore {
  constructor(tokenLength) {
    this.tokens = {};
    this.tokenLength = tokenLength;
  }

  newToken(idToken) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < this.tokenLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.tokens[result] = idToken;

    return result;
  }

  getToken(userToken) {
    return this.tokens[userToken];
  }

  deleteToken(userToken) {
    delete this.tokens[userToken];
  }
}

module.exports = {
  TokenStore
}