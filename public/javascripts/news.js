/* Add: Elements to database */
$('form').on('submit', (e) => {
    //document.write('Ser recieved our data');

    $.post('/TeamAdd', function() {
        document.write('Ser recieved our data');
    });
});

/* Displays the data gotten from database */
function display_news(data) {
    var length = data.length, x = "", i;
    for (i=0; i < length; i++) {
        x = x + "<div class=\"card text-center\">\n" +
            "            <div class=\"card-header\">\n" +
                            data[i].committee +
            "            </div>\n" +
            "            <div class=\"card-body\">\n" +
            "                <h5 class=\"card-title\">" + data[i].title + "</h5>\n" +
            "                <p class=\"card-text\">" + data[i].description + "</p>\n" +
            "                <a href=\"#\" class=\"btn btn-primary\">Read More</a>\n" +
            "            </div>\n" +
            "            <div class=\"card-footer text-muted\">\n" +
                            data[i].date +
            "            </div>\n" +
            "        </div>\n" +
            "        <br>";
    }
    document.getElementById("MainDiv").innerHTML = x;
    console.log("Done");
}
