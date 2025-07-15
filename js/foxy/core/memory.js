const memory = {
  name: null,
  service: null,

  setName(newName) {
    this.name = newName;
  },

  setService(serviceName) {
    this.service = serviceName;
  },

  reset() {
    this.name = null;
    this.service = null;
  }
};

export default memory;
