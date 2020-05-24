//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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

searchBar.addEventListener('keyup', (e) => {
  //grabbing the typed text from search box
  let searchSrting = e.target.value.toLowerCase();
  //making the filter
  let episodeList = getAllEpisodes();
  let filteredCharacter = episodeList.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchSrting) ||
      character.summary.toLowerCase().includes(searchSrting)
    );
  })
  console.log(filteredCharacter);


})



window.onload = setup;