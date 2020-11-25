var express = require('express');
var router = express.Router();

var data;

/* News Collection: from database*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MemberSchema = new Schema({
        image: String,
        name: String,
        major: String,
        pronouns: String,
        committee: String,
        title: String,
        description: String
    },
    {collection: 'Team'}
);
var MemberModel = mongoose.model('Team', MemberSchema);

/* Helpers: for Adding, Removing and Getting elements from database */
function add_news(model, news){
    MemberModel.create(news, function (err, element) {
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

/* Get: data from database about members before page rendering */
data = get_news(MemberModel);

const sendData = (req, res) => {
    res.send(data);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('team', {data: data});
    res.send(data);
});

module.exports = {
    router: router,
    model: mongoose.model("Model", MemberSchema),
    add_news: add_news,
    get_news: get_news,
    data: data,
    sendData: sendData
};