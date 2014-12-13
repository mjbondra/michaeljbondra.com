/**
* CRUD messages
*/

function created (model) {
  model = model || 'Content';
  return model + ' was successfully created';
}

function deleted (model) {
  model = model || 'Content';
  return model + ' was successfully deleted';
}

function read (model) {
  model = model || 'Content';
  return model + ' was successfully read';
}

function updated (model) {
  model = model || 'Content';
  return model + ' was successfully updated';
}

exports.crud = {
  
  // Model-level CRUD messages

  message: {
    created: function (name) {
      name = name ? ', ' + name : '';
      return 'Thank you' + name + '! Your message has been sent.';
    },
  },

  // Unbound CRUD messages

  created: created(),
  deleted: deleted(),
  read: read(),
  updated: updated()
};

/**
 * Validation messages
 */

function required (field) {
  field = field || 'Field';
  return field + ' cannot be empty';
}

function email (field) {
  field = field || 'Field';
  return field + ' must be a valid email address';
}

exports.validation = {

  // Model-level validation messages

  message: {
    body: {
      required: required('Comments')
    },
    email: {
      email: email('Email')
    }
  },

  // Field-level validation messages

  // Unbound validation messages

  required: required(),
  email: email()
};
