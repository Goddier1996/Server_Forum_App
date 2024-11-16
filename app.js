const express = require(`express`)
const cors = require(`cors`)
const http = require(`http`)

let app = express()
app.use(cors())
app.use(express.json())

app.use('/api/messages', require('./routes/messages'))
app.use('/api/category', require('./routes/category'))
app.use('/api/topics', require('./routes/topics'))
app.use('/api/users', require('./routes/users'))


const PORT = process.env.PORT || 5000
process.setMaxListeners(100)

const server = http.createServer(app)
server.listen(PORT, () => { console.log(`the server is live at http://localhost:${PORT}`) })