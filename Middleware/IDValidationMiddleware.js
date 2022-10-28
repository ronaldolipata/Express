const IDValidation = (req, res, next) => {
  const id = req.params.id;
  const userExists = req.users.find((user) => user.id === id);

  if (!userExists) {
    return res.status(422).json({
      Error: 'User was not found',
    });
  }

  next();
};

export default IDValidation;
