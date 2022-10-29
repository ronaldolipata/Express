import express from 'express';
import EmailValidation from '../Middleware/EmailValidationMiddleware.js';
import IDValidation from '../Middleware/IDValidationMiddleware.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router
  .route('/')
  .all((req, res, next) => {
    req.users = req.app.get('users');
    next();
  })
  .get((req, res) => {
    res.status(200).json(req.users);
  })
  .post(EmailValidation, (req, res) => {
    const { firstName, lastName, email } = req.body;
    const id = uuidv4();

    const filteredData = {
      id,
      firstName,
      lastName,
      email,
    };

    req.users.push(filteredData);
    res.status(201).json(filteredData);
  });

router
  .route('/:id')
  .all((req, res, next) => {
    req.users = req.app.get('users');
    req.id = req.params.id;
    next();
  })
  .get(IDValidation, (req, res) => {
    const findUser = req.users.find((user) => user.id === req.id);
    res.status(200).json(findUser);
  })
  .patch(IDValidation, (req, res) => {
    const updatedEmail = req.body.email;
    const findUser = req.users.find((user) => user.id === req.id);
    findUser.email = updatedEmail;
    res.status(200).json(findUser);
  });

export default router;
