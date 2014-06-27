
module.exports = {

  /**
   * Authentication messages
   */
  authentication: {
    incorrect: {
      user: function (username) { return 'User \'' + username + '\' was not found'; },
      email: function (email) { return 'Email address \'' + email + '\' is not associated with an account'; },
      password: 'Password is incorrect'
    },
    requires: {
      authentication: function (path) { return 'You must be authenticated to access ' + path; }
    },
    success: function (username) { return 'Authenticated as \'' + username + '\''; }
  },

  /**
   * Model messages (CRUD, etc)
   */
  project: {
    created: function (title) { return 'Post \'' + title + '\' was created'; },
    deleted: function (title) { return 'Post \'' + title + '\' was deleted'; },
    updated: function (title) { return 'Post \'' + title + '\' was updated'; }
  },

  user: {
    updated: function (username) { return 'User \'' + username + '\' was updated'; }
  },

  image: {
    created: function (title) { return 'Image \'' + title + '\' was created'; },
    deleted: function (title) { return 'Image \'' + title + '\' was deleted'; },
    updated: function (title) { return 'Image \'' + title + '\' was updated'; },
    exceedsFileSize: function (size) { return 'Image must be smaller than ' + size / 1024 / 1024 + ' MB'; },
    mimeError: function (mime) { return 'File type \'' + mime + '\' is not supported'; },
    unknownError: 'The was an unknown error while uploading this image'
  },

  /*
   * Field validation messages
   */
  body: {
    isNull: 'Body field cannot be empty'
  },
  comments: {
    isNull: 'Comments cannot be empty'
  },
  email: {
    notEmail: 'Email address must be valid',
    isNull: 'Email address cannot be empty'
  },
  password: {
    isNull: 'Password cannot be empty'
  },
  position: {
    isNull: 'Position cannot be empty',
    notNumeric: 'Position must be numeric'
  },
  title: {
    isNull: 'Title cannot be empty'
  },
  username: {
    notNull: 'Username cannot be empty'
  },
  url: {
    notUrl: 'Url must be valid'
  },

  /**
   * Unbound validation messages
   */
  default: 'Sorry! There was an error',
  notUnique: function (dbCollection, collectionField, fieldValue) {
    return collectionField + ' \'' + fieldValue + '\' already exists, please enter another';
  },

  /**
   * HTTP status code messages
   */
  status: {
    403: 'You are not authorized to access this content',
    404: 'The content you were looking for was not found',
    500: 'There was a server error while processing your request'
  }
};
