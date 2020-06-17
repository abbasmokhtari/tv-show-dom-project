//You can edit ALL of the code here
function setup() {
  // const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  fetchData()
}

const fetchData = () => {
  fetch('https://api.tvmaze.com/shows/82/episodes')
  .then(response => response.json())
    .then(data => onGetData(data));
}



function onGetData(data) {
  makePageForEpisodes(data);
}


function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById('root');
  episodeList
    .map(x => makeDiv(x.name, x.season, x.number, x.image.medium, x.summary))
    .forEach(x => rootElem.appendChild(x))
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

// generate 0 before numbers less than 10
let zeroAdd = (num) => {
  if (num > 9) {
    return num
  } else {
    return '0' + num
  }
}

// getting the name of an episode

let makeTitle = (title, season, number) => {
  let titleElement = document.createElement('h3');
  titleElement.innerText = `${title} - S${zeroAdd(season)}E${zeroAdd(number)}`;
  return titleElement
}

//Getting photo

let makePhoto = (photo) => {
  let photoElement = document.createElement('img');
  photoElement.src = photo;
  return photoElement
}

//getting the summary
let makeSummary = (summary) => {
  let summaryElement = document.createElement('p');
  summaryElement.innerText = summary
    .substring(0, summary.length - 4)
    .substring(3);
  return summaryElement
}

// making the main DIV

let makeDiv = (title, season, number, photo, summary) => {
  let newDiv = document.createElement('div');
  let newTitle = makeTitle(title, season, number);
  let newPhoto = makePhoto(photo);
  let newSummary = makeSummary(summary);
  newDiv.appendChild(newTitle);
  newDiv.appendChild(newPhoto);
  newDiv.appendChild(newSummary);
  newDiv.className = 'main-block';
  return newDiv
}


// 200 search bar

let searchBar = document.querySelector('#searchbox');

//list of all items
const episodeList = getAllEpisodes();

searchBar.addEventListener('keyup', (e) => {
  //grabbing the typed text from search box
  let searchSrting = e.target.value.toLowerCase();
  //making the filter
  const mainBlock = document.querySelectorAll('.main-block')
  const filteredCharacter = episodeList.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchSrting) ||
      character.summary.toLowerCase().includes(searchSrting)
    );
  })

  //display Result
  if (filteredCharacter.length >= 0) {
    mainBlock.forEach(x => x.style.display = 'none');
    makePageForEpisodes(filteredCharacter);
    //text next to search bar
    const searchArea = document.querySelector('.result-num');
    searchArea.innerText = `${filteredCharacter.length}`;
  } else if (searchSrting = '') {
    makePageForEpisodes(episodeList);
    const displayResult = document.querySelector('.display-result');
    displayResult.style.display = 'none';
  }
})

//300 select menu

let pullDown = document.querySelector('#pull-down');

//generating the list
let makePullDownList = (title, season, number) => {
  let listElement = document.createElement('option');
  listElement.innerText = `S${zeroAdd(season)}E${zeroAdd(number)} - ${title}`;
  listElement.setAttribute('value', `${title}`);
  return listElement
}

//populate the pull down menu

let makePullDownMenu = (episodeList) => {
  episodeList
    .map(x => makePullDownList(x.name, x.season, x.number))
    .forEach(x => pullDown.appendChild(x))
}

makePullDownMenu(episodeList);


//making pull down menu work

pullDown.addEventListener('change', (event) => {
  const result = event.target.value.toLowerCase();
  const mainBlock = document.querySelectorAll('.main-block')
  const filteredCharacter = episodeList.filter((character) => {
    return (
      character.name.toLowerCase().includes(result) 
    );
  })
  //display Result
  if (filteredCharacter.length >= 0) {
    mainBlock.forEach(x => x.style.display = 'none');
    makePageForEpisodes(filteredCharacter);
  } else if (result = 'Select Episode') {
    makePageForEpisodes(episodeList);
  }
})




window.onload = setup;