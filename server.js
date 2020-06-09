import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors());

mongoose.connect(
  process.env.MONGOLAB_URI
    || 'mongodb://localhost/memberapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const appToken = '1234567890';

passport.use(
  new Strategy((token, cb) => {
    // console.log(token);
    if (token === appToken) {
      return cb(null, true);
    }
    return cb(null, false);
  }),
);

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
});

const searchDb = mongoose.model('users', userSchema);

const routes = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get(
    '/login',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
      res.json({
        message:
          'GET is not allowed. Please POST request with username and password.',
      });
    },
  );

  app.post(
    '/login',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
      console.log(req.body);
      const { username } = req.body;
      const { password } = req.body;

      searchDb.find({ username }, (err, data) => {
        res.json(data);
      }).lean();
    },
  );
};

const router = express.Router();
routes(router);

app.use('/v1', router);

app.listen(port, () => console.log(
  `Example app listening at http://localhost:${port}`,
));
