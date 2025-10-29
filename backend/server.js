require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/db/db')


connectDB()
const PORT = process.env.PORT || 8001


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})