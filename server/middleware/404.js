module.exports = function () {
  return function *() {
    this.status = 404;
    this.body = {
      msg: 'Not found',
      status: this.status
    };
  };
};
