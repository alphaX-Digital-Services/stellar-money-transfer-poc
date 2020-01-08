const app = require('./app');
const info = require('debug')('app:info:src-index');
const getEnv = require('./helpers/get-env');

app.listen(getEnv('node_port'), () => {
  info(`Server started on port ${getEnv('node_port')}`);
});
