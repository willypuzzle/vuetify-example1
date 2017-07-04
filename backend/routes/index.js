var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/add-user', (req, res, next) => {
  let User = global.model.get('user')
  let email = req.body.email
  let name = req.body.name
  let password = req.body.password

  User.findOne({email: email}).exec()
  .then((user) => {
    if (user) {
      res.json({
        success: false,
        reason: 'user-exists'
      })
      return null
    } else {
      let user = new User({
        name: name,
        email: email
      })

      user.setPassword(password)

      return user.save()
    }
  })
  .then((user) => {
    if (user) {
      res.json({
        success: true
      })
    }
  }).catch((err) => {
    global.helper.log(__filename, __line, err)
  })
})

module.exports = router
