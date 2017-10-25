window.onload = function() {
    const all = document.getElementById("all-channels");
    const online = document.getElementById("online-channels");
    const offline = document.getElementById("offline-channels");
    const channels = document.getElementById("channels");
    const channelArr = ["esl_sc2"];

    // Render Channels
    function addChannels(data) {
        const name = data.display_name;
        const game = data.game;
        const logo = data.logo;
        const status = data.status;
        const url = data.url;
        const views = data.views;
        let content = '';

        for (let i = 0; i < channelArr.length; i++) {
            content += `<a href=${url} target="_blank">
                <div id="${name}-channel" class="channels">
                    <h1 id="${name}-name">${name}</h1>
                    <img src="${logo}"></img>
                    <h2 id="${game}-game">${game}</h2>
                    <h3 id="${status}">${status}</h3>
                </div>
            </a>`;
        }
        console.log(logo);

        channels.insertAdjacentHTML('beforeend', content);
    }
    
    // Fetch channels 
    fetch("https://wind-bow.glitch.me/twitch-api/channels/esl_sc2")
    .then(res => res.json())
    .then(addChannels)
    .catch(err => requestError(err, "query"));

    // Error function
    function requestError(part) {
        channels.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
};