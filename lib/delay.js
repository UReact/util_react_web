class Delay {
  constructor(ms) {
    this.ms = ms || 500;
  }

  do(callback, obj) {
    clearTimeout(this.timeoutFunc);

    this.timeoutFunc = setTimeout(() => {
      callback(obj);
    }, this.ms);
  }
}

module.exports = Delay;
