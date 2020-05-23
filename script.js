//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById('root');
  episodeList
    .map(x => makeDiv(x.name, x.season, x.number))
    .forEach(x => rootElem.appendChild(x))
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

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



// making the main DIV

let makeDiv = (title, season, number) => {
  let newDiv = document.createElement('div');
  let newTitle = makeTitle(title, season, number);
  newDiv.appendChild(newTitle);
  return newDiv
}




window.onload = setup;