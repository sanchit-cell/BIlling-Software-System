class PUBLIC_DATA {
  static port = process.env.PORT || 4000;
  static mongo_uri =
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI_ATLAS
      : process.env.MONGODB_URI_LOCAL;

  static jwt_auth = process.env.JWT_AUTH || "@#$%^&*(@#$%^&*($%^))#$%^&";
}

module.exports = {
  PUBLIC_DATA,
};
