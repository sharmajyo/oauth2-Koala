const ALLOWED_SCOPES = [
  'read:tenants', 'manage:tenants'
];


module.exports = {
  ALLOWED_SCOPES,
  TOKEN_EXPIRY_IN_MINS: 10,
  SUPPORTED_GRANTS: ['client_credentials'],
  SECRET: "VEhRVmpKNHV6SldDSFJOdUV4N1ZoNnhuTjlWV3VDWQ==",
};