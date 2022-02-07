const { query } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  }),
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
/*rota do public/css*/
app.use(express.static('public'))
/*Rota do form*/
app.get('/users/create', (req, res) => {
  res.render('adduser')
})
app.post('/users/create', async (req, res) => {

  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  await User.create({ name, occupation, newsletter })

  res.redirect('/')

})
/*resgatando dados utilizando Where*/
app.get('/users/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ row: true, where: { id: id } })

  res.render('userview', { user })
})
/*Removendo dados com destroy*/
app.post('/users/delete/:id', async (req, res) => {

  const id = res.params.id

  await User.destroy({ where: { id: id } })

  res.redirect('/')
})
/*Resgatando dados edit item*/
app.get('/users/edit/:id', async (req, res) => {

  const id = res.params.id

  try {
    const user = await User.findOne({ include: Address, where: { id: id } })
    res.render('useredit', { user: user.get({ plain: true }) })
  } catch (error) {
    console.log(error)
  }

})
/*dados Update*/
app.post('/users/update', async (req, res) => {

  const id = res.body.id
  const name = res.body.name
  const occupation = res.body.occupation
  let newsletter = res.body.newsletter

  if (newsletter === 'on') {
    newsletter: true
  } else {
    newsletter: false
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter
  }

  await User.update(userData, { where: { id: id } })
  res.redirect('/')
})
/*Rota do home*/
app.get('/', async (req, res) => {

  const users = await User.findAll({ raw: true })

  console.log(users)

  res.render('home', { users: users })
})

/*Rota address Endereço*/
app.post('/address/create', async (res, req) => {

  const UserId = req.body.UserId
  const street = req.body.street
  const number = req.body.number
  const city = req.body.city

  const address = {
    UserId,
    street,
    number,
    city,
  }

  await Address.create(address)

  res.redirect(`/users/edit/${UserId}`)
})

/*Removendo relacionados destroy*/
app.post('/address/delete', async (res, req) => {
  const UserId = req.body.UserId
  const id = req.body.id

  await Address.destroy({
    where: { id: id }
  })

  res.redirect(`/users/edit/${UserId}`)

})

conn
  .sync()
  //.sync({ force: true })
  .then(() => {
    app.listen(3000)
  })
  .catch(err => console.log(err))