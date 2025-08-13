const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
  }
}
connectToMongoDB()

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
