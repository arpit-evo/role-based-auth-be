const getUser = async (req) => {
  return req.user;  
};

module.exports = {
  getUser
}