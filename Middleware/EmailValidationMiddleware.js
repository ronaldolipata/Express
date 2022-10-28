const EmailValidation = (req, res, next) => {
  const { email } = req.body;
  const symbolExists = email.includes('@');

  if (!symbolExists) {
    return res.status(422).json({
      Error: 'Email should have @',
    });
  }

  const emailExists = req.users.find((user) => user.email === email);

  if (emailExists) {
    return res.status(422).json({
      Error: 'Email already exists',
    });
  }

  next();
};

export default EmailValidation;
