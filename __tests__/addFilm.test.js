const request = require('request');
const film = {
    "name": "New Movie",
    "year": "1992",
    "rating": 5,
    "release_date": "04 Dec 1992",
    "country": "USA",
    "ticket_price": 122,
    "genre": "Comedy",
    "description": "Ricky is the hottest water-ski instructor around and he has just be rehired by his former employer/camp to whip up attendance. But the camp is in serious financial trouble and the owner of ..."
}
const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJKYXplYiIsInBhc3N3b3JkIjoiJDJiJDEwJDZtTmI5aUduWUtOeEl1c1I5ckh1ai5QaVJpb0NQZGhZTmZBaGQxLmprWGp6RlhiZ0wudkNxIn0.X89LvsDnm4WYMTTuVWGjVNxp6QCxtXz0VAinnLX__n8'

test('Add new Film', done => {
    request.post(`http://localhost:3000/film/`, { form: film }, (err, response) => {
        expect(err).toBe(null)
        body = JSON.parse(response.body);
        expect(body.status).toBe(true)
    });
    done();
});

test('Get film by id', done => {
    request.get(`http://localhost:3000/films/607a9598e688fe8120849748`, (err, response) => {
        expect(err).toBe(null)
        body = JSON.parse(response.body);
        expect(body).not.toBe(null);
    });
    done();
});

test('Register user', done => {
    request.post(`http://localhost:3000/user/register`, { form: { user_name: 'jazeb', password: 'password' } }, (err, response) => {
        expect(err).toBe(null);
        expect(response.statusCode).toBe(200)
    });
    done();
});

test('Comment on film', done => {
    request.post(`http://localhost:3000/film/comment`, { headers: { Authorization: token }, form: { comment: 'Nice movie', movie_id: '607a9598e688fe8120849748' } }, (err, response) => {
        expect(err).toBe(null)
        expect(response.statusCode).toBe(200);
    });
    done();
});
