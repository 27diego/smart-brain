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

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age } = req.body.formInput;

  db("users")
    .where({ id })
    .update({ name })
    .then(resp => {
      if (resp) {
        res.json("success");
      } else {
        res.status(400).json("unable to update");
      }
    })
    .catch(err => res.status(400).json("error updating user"));
};

module.exports = {
  handleProfileGet: handleProfileGet,
  handleProfileUpdate
};
