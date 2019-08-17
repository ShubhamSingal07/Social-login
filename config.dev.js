module.exports = {
  google: {
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    callback: "/auth/google/redirect",
  },
  facebook: {
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    callback: "/auth/facebook/redirect",
  },
  instagram: {
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    callback: "/auth/instagram/redirect",
  },
  mongodb: {
    URI: "mongodb://localhost/oauth",
  },
  session: {
    cookieKey: "COOKIE_KEY",
  },
  frontend: {
    url: "REACT_APP_URL",
  },
};
