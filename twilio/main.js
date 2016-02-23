Twilio.listenForMessages(function (msg) {
    getLyrics(msg.body).then(function (data) {
        Twilio.sendMessage(msg.from, data.description + '\n\n' + data.url)
    })
});

function getLyrics (query) {
    return fetch('https://api.genius.com/search?access_token=TKSln2THcBVhtdwgVD_QDs49gY8x_t90DsFzuHxHgGXBWQ0oiYAcuNZYE2Cn4nO6&q=' + encodeURIComponent(query)).then(function (response) {
            return response.json().then(function (data) {
                var hit = data.response.hits[0]
                return {
                    url: hit.result.url,
                    description: hit.result.title + ' by ' + hit.result.primary_artist.name
                }
            })
        })
}
