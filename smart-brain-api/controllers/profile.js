const handleProfileGet = (req, res, db) => {
  //maybe for profile page
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({
      id
    })
    .then(user => {
      if (user.lengh !== 0) {
        res.json(user[0]);
      } else {
        res.status(404).json("user not found");
      }
    })
    .catch(err => res.status(404).json("error getting user"));
};

module.exports = {
  handleProfileGet: handleProfileGet
};
