function fetchDataAndDisplay(){
    fetch('https://api.thingspeak.com/channels/2444043/fields/1.json?api_key=NKIHDO428VD1WBQC&results=2')
    .then(response => response.json())
    .then(data =>{
        const latestFeed = data.feeds[data.feeds.length - 1];
        const latestField1 = latestFeed.field1;
        const dataOnUi = `<h1>Data: ${latestField1}</h1>`;
        // console.log(latestField1);

        const dataDiv = document.querySelector('.data');
        dataDiv.innerHTML = dataOnUi;
    })
    .catch(error=>{
        console.log('There is some problem from the server side',error);
        
    })

}


fetchDataAndDisplay();
setInterval(fetchDataAndDisplay, 5000);

