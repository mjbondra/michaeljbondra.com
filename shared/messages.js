exports.crud = {
  message: {
    created: function (name) {
      name = name ? ', ' + name : '';
      return 'Thank you' + name + '! Your message has been sent.';
    },
  },

  created: function (model) {
    model = model || 'Content';
    return model + ' was successfully created';
  },
  deleted: function (model) {
    model = model || 'Content';
    return model + ' was successfully deleted';
  },
  read: function (model) {
    model = model || 'Content';
    return model + ' was successfully read';
  },
  updated: function (model) {
    model = model || 'Content';
    return model + ' was successfully updated';
  }
};

exports.validation = {
  message: {
    body: {
      required: this.required('Comments')
    },
    email: {
      email: this.email()
    },
  },

  required: function (field) {
    field = field || 'Field';
    return field + ' cannot be empty';
  },
  email: function (field) {
    field = field || 'Field';
    return field + ' must be a valid email address';
  }
};
