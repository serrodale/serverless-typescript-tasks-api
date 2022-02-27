# Basic Tasks API with TS + Serverless Framework

## Running the app

```bash
$ npm run start:local
```

And go to: http://localhost:3000/dev.

### Considerations/improvements

Most of them, for the sake of simplicity.

* Endpoints are not secured; anyone can access them.
* Validation of incoming data is performed manually; it'd make more sense to use a data validation library like [Joi](https://github.com/sideway/joi).
* The service layer contains business logic plus DB-related logic; the latter should be extracted out to a repository.
* There is a lot of room for improvement regarding exception handling. For example, by adding a global error manager.
* Only a few test cases are provided as an example.
