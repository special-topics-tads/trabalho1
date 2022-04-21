module.exports = {
  mongoURI:
    process.env.NODE_ENV == 'production'
      ? 'mongodb+srv://LeonardoZanotti:8OvlKLyNQiZneaUv@cluster0.usxxj.mongodb.net/trabalho1?retryWrites=true&w=majority'
      : 'mongodb://localhost:27017/car',
};
