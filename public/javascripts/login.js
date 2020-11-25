$('form').on('submit', (e) => {

    const user = $('#username').val().trim();
    const pwd = $('#pwd').val().trim();

    const data = {
        user,
        pwd
    };

    $.post('/auth', data, function() {
        console.log('Server recieved our data');
    });
});