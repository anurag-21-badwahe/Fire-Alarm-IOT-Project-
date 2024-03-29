const soundButton = document.querySelector('.sound_button');
let soundEnabled = true;

function fetchDataAndDisplay() {
    fetch('https://api.thingspeak.com/channels/2444043/fields/1.json?api_key=NKIHDO428VD1WBQC&results=2')
        .then(response => response.json())
        .then(data => {
            const latestFeed = data.feeds[data.feeds.length - 1];
            const latestField1 = latestFeed.field1;
            const dataOnUi = `<h1>Data: ${latestField1}</h1>`;

            if (latestField1 > 50 && soundEnabled) {
                const audio = document.getElementById('audio');
                audio.play();
            }

            const dataDiv = document.querySelector('.data');
            dataDiv.innerHTML = dataOnUi;
        })
        .catch(error => {
            console.log('There is some problem from the server side', error);
        });
}

fetchDataAndDisplay();
setInterval(fetchDataAndDisplay, 5000);

soundButton.addEventListener('click', function() {
    const audio = document.getElementById('audio');
    soundEnabled = !soundEnabled;
    if (!audio.paused && soundEnabled) {
        audio.pause();
    }

    if (soundEnabled) {
        soundButton.innerHTML = 'Alarm is on';
        soundButton.style.backgroundColor = "blue";
        
    } else {
        soundButton.innerHTML = 'Alarm is off';
        soundButton.style.backgroundColor = "white";

        audio.pause();
    }
});
