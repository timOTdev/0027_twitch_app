window.onload = function() {
    const all = document.getElementById("all-channels");
    const online = document.getElementById("online-channels");
    const offline = document.getElementById("offline-channels");
    const channels = document.getElementById("channels");
    const channelArr = ["esl_sc2", "freecodecamp", "twitchpresents", "div_io"];

    // Render Channels
    function addChannels(data) {
        const name = data.display_name;
        const game = data.game;
        const logo = data.logo;
        const offlineLogo = "https://static-cdn.jtvnw.net/jtv_user_pictures/dd542e0da09855b6-profile_image-300x300.jpeg";
        const topic = data.status;
        const url = data.url;
        const views = data.views;
        let content = '';

        fetch(`https://wind-bow.glitch.me/twitch-api/streams/${data.name}`)
            .then(res => res.json())
            .then(renderChannels)
            .catch(err => requestError(err, "query"));
    
        function renderChannels(response) {
            if (response.stream) {
                content += `<a href=${url} target="_blank">
                    <div id="${name}-channel" class="online">
                        <h1 id="${name}-name">${name}</h1>
                        <h2 id="${game}-game">${game}</h2>
                        <img src="${logo}"></img>
                        <h2 id="live">Online</h2>
                        <h3 id="${topic}">${topic}</h3>
                    </div>
                </a>`;
            }
            else {
                content += `<a href=${url} target="_blank">
                    <div id="${name}-channel" class="offline">
                        <h1 id="${name}-name">${name}</h1>
                        <h2 id="${game}-game">${game}</h2>
                        <img src="${offlineLogo}"></img>
                        <h2 id="live">Offline</h2>
                        <h3 id="${topic}">No current stream</h3>
                    </div>
                </a>`;
            }

        channels.insertAdjacentHTML('beforeend', content);
        }
    }
    
    // Fetch channels 
    channelArr.forEach(function(channel) {
        fetch(`https://wind-bow.glitch.me/twitch-api/channels/${channel}`)
        .then(res => res.json())
        .then(addChannels)
        .catch(err => requestError(err, "query"));
    })
    
    // Error function
    function requestError(part) {
        channels.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
};