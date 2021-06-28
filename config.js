module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://masternod:passwordCluster@crud.v1ghr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    urlParser : {
        useNewUrlParser: true,
        useUnifiedTopology : true,
        useFindAndModify : false,
        useCreateIndex : true,
    }
}