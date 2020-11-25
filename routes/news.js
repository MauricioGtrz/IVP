var express = require('express');
var router = express.Router();
var data;


/* News Collection: from database*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NewsSchema = new Schema({
    committee: String,
    title: String,
    description: String,
    date: String
    },
    {collection: 'News'}
);
var NewsModel = mongoose.model('News', NewsSchema);

/* Helpers: for Adding, Removing and Getting elements from database */
function add_news(model, news){
    NewsModel.create(news, function (err, element) {
        if (err) throw (err);
    });
    console.log("Added news successfully.")
}

function get_news(model) {
    model.find({}, function (err, result) {
        if (err) throw err;
        else data = result;
    });
    return data;
}

/* Get: data from database about news before page rendering */
data = get_news(NewsModel);

const sendData = (req, res) => {
    res.send(data);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('news', { title: 'News', data: data || ['No updates at the moment!'] });
    res.send(data);
});


module.exports = {
    router: router,
    model: mongoose.model("News", NewsSchema),
    add_news: add_news,
    get_news: get_news,
    data: data,
    sendData: sendData
};