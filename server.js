const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})
app.set('view enhine', 'hbs');

app.use((req, res, next) => {
	let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);

	fs.appendFile('server.log', log + '\n', (err) => {
	if(err) {
		console.log('Unable to append to server.log');
	}
});

    next();
});
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    //res.send("<h1>Hello Express!</h1>");
    res.render('home.hbs', {
    	pageTitle: 'Home Page',
    	welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
    	pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
    	errorMessage: 'Unable to handle request'
    });
});


app.listen(3000);