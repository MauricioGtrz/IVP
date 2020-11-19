/* EMAIL: Get Email, subject, and text. USED: contact.ejs */
$('form').on('submit', (e) => {

    const name = '';
    const email = $('#email').val().trim();
    const subject = $('#subject').val().trim();
    const text = $('#text').val().trim();

    const data = {
        name,
        email,
        subject,
        text
    };

    $.post('/email', data, function() {
        console.log('Server recieved our data');
    });
});