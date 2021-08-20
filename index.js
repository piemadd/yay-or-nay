const express = require('express');

const app = express();

app.set('view engine', 'ejs');

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

const list_of_persons = [
	'mom',
	'dad',
	'mother',
	'father',
	'legal_guardian',
	'david',
	'friend',
	'acquaintance',
	'boss',
	'coworker',
	'elon_poopy_butt_musk'
]

app.get('/', (req, res) => {
	res.render('index', {});
});

app.get('/favicon.ico', (req, res) => {
	res.sendFile(`favicon.ico`, { root: 'public' })
});

app.get('/audio/:pitch/:person/:response/audio.mp3', (req, res) => {
	if (req.params.pitch != 'masculine' && req.params.pitch != 'feminine') {
		res.send('404 Error - Make sure your pitch is set to \'masculine\' or \'feminine\'.')
	} else if (list_of_persons.indexOf(req.params.person) == -1) {
		res.send('404 Error - Make sure your person is in the following list: ' + list_of_persons)
	} else if (req.params.response != 'yes' && req.params.response != 'no') {
		res.send('404 Error - Make sure your response is set to \'yes\' or \'no\'.')
	} else {
		res.sendFile(`audio/${req.params.pitch}/${req.params.response}_${req.params.person}.mp3`, { root: 'public' })
	}
});

app.get('/menu', (req, res) => {
	if (req.query.pitch != 'masculine' && req.query.pitch != 'feminine') {
		res.send('404 Error - Make sure your pitch is set to \'masculine\' or \'feminine\'.')
	} else if (list_of_persons.indexOf(req.query.person) == -1) {
		res.send('404 Error -Make sure your person is in the following list: ' + list_of_persons)
	} else {
		res.render('play', {
			person: req.query.person,
			person_formatted: toTitleCase(req.query.person.split("_").join(" ")).replace("Poopy Butt", "\"Poopy Butt\""),
			pitch: req.query.pitch
		})
	}
})

app.get('/privacy', (req, res) => {
	res.render('privacy');
})

app.listen(3000, () => {
	console.log('server started');
});