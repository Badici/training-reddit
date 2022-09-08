window.onload = callStartupFunctions;

function callStartupFunctions() {
    addElements();
    // makeRequest("wallpaper");
}

function addElements() {
    let header = document.createElement("h1");
    header.textContent = "Reddit top posts";

    let listings = document.createElement("div");
    listings.setAttribute("id", "listings-div")
    listings.innerHTML = '<input type="text" placeholder="Search for a Subreddit..." id="search-bar" onchange="makeRequest(this.value)">';

    document.getElementById("main").appendChild(header);
    document.getElementById("main").appendChild(listings);

}

async function refreshLisitings(responseAsJson) {

    console.log('json in refresh: ', responseAsJson);
    let listItems = document.createElement("ol");
    listItems.setAttribute('id', 'items-list');
    document.getElementById("listings-div").appendChild(listItems);

    for (let i = 0; i < 20; i++) {

        let listItem = document.createElement("li");


        listItem.innerHTML = '<p>Author: ' + responseAsJson[i].data.author + '</p> <br>' +
            '<p>' + responseAsJson[i].data.title + ':</p> <br>' +
            '<img src="' + responseAsJson[i].data.thumbnail + '" id="' + i + '" alt="" onclick="markAsFavorite(this.id)">';
        document.getElementById('items-list').appendChild(listItem);

    }


}
//for merge
function makeRequest(subreddit) {
    console.log("entered request function");
    let request = new XMLHttpRequest();
    let responseAsJson;
    request.open("GET", "https://www.reddit.com/r/" + subreddit + "/top.json");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            responseAsJson = JSON.parse(request.response).data.children;
            console.log("Succesful request");
            console.log(responseAsJson);
        } else {
            console.log('error ${request.status} ${request.statusText}')
        }
        refreshLisitings(responseAsJson);
    }
}

function markAsFavorite(imgId) {
    let images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.remove("favorite");
        if (img.id === imgId) {
            img.classList.add("favorite");
        }
    })
}