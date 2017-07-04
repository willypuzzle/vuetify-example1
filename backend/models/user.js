var crypto = require('crypto')

module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    name: String,
    email: {
      type: String,
      lowercase: true,
      required: [
        true,
        "can't be blank"
      ],
      match: [
        /\S+@\S+\.\S+/,
        'is invalid'
      ],
      index: {
        unique: true
      }
    },
    salt: String,
    hash: String
  }, {timestamps: true})

  schema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  }

  schema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
  }

  return mongoose.model('User', schema)
}
