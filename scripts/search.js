// Методы, которые могут пригодиться:
// starWars.searchCharacters(query), 
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)

const queryInput = document.querySelector('.input');
const queryInputId = document.querySelector('.inputId');
const resultBlock = document.getElementById('result-container');
const nameSearch = document.querySelector('p');
const contentBlock = document.getElementById('content');
const spin = document.querySelector('.spinner');
const resourceSelect = document.querySelector('.selectSearch');
const resourceSelectId = document.querySelector('.selectId');

document.getElementById('byQueryBtn').addEventListener('click', async function() {
    queryInputId.value = '';
    resultBlock.style.visibility = 'hidden';
    spin.style.visibility = 'visible';
    let query = queryInput.value.trim();

    const selectedResource = resourceSelect.value;
    try {
        let result;
    switch (selectedResource) {
        case 'people':
            result = await starWars.searchCharacters(query);
            break;
        case 'planets':
            result = await starWars.searchPlanets(query);
            break;
        case 'species':
            result = await starWars.searchSpecies(query);
            break;
    }
    contentBlock.innerHTML = '';
    if (result.results && result.results.length > 0) {
        result.results.forEach(character => {
            const characterHTML = createCharacterHTML(character);
            contentBlock.innerHTML += characterHTML;
        });
        if (selectedResource === 'people'  || selectedResource === 'species') {
            const homeworldURL = result.results[0].homeworld;
            id = homeworldURL.split('/').reverse()[1];
            const resultPlanet = await starWars.getPlanetsById(id);
            const planetName = resultPlanet.name;
            contentBlock.innerHTML = contentBlock.innerHTML.replace(homeworldURL, planetName);
        }
        nameSearch.textContent = result.results[0].name;
    } else {
        contentBlock.innerHTML = '<p>there is no such</p>';
        nameSearch.textContent = query;
        
    }
    } catch(er) {
        console.log('search error: ', err)
    }
    
    spin.style.visibility = 'hidden';
    resultBlock.style.visibility = 'visible';
});

document.getElementById('byQueryBtnId').addEventListener('click', async function() {
    queryInput.value = '';
    resultBlock.style.visibility = 'hidden';
    spin.style.visibility = 'visible';
    let id = queryInputId.value.trim();

    const selectedResource = resourceSelectId.value;
    try{
        let result;
    switch (selectedResource) {
        case 'people':
            result = await starWars.getCharactersById(id);
            break;
        case 'planets':
            result = await starWars.getPlanetsById(id);
            break;
        case 'species':
            result = await starWars.getSpeciesById(id);
            break;
        case 'films':
            result = await starWars.getFilmsById(id);
            break;
    }
    contentBlock.innerHTML = '';
     if (result.detail !== "Not found" && id !== '') {
        const characterHTML = createCharacterHTML(result);
        contentBlock.innerHTML = characterHTML;
        
        if (selectedResource === 'people'  || selectedResource === 'species') {
            const homeworldURL = result.homeworld;
                id = homeworldURL.split('/').reverse()[1];
                const resultPlanet = await starWars.getPlanetsById(id);
                const planetName = resultPlanet.name;
                contentBlock.innerHTML = contentBlock.innerHTML.replace(homeworldURL, planetName);
        }
        nameSearch.textContent = result.name;
    } else {
        contentBlock.innerHTML = '<p>enter ID</p>';
        nameSearch.textContent = '';
    }
    } catch {
        console.log('ID error: ', err)
    }
    
    resultBlock.style.visibility = 'visible';
    spin.style.visibility = 'hidden';
})

function createCharacterHTML(character) {
    return  Object.entries(character)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                const arrayValuesHTML = value.map(item => `<p style="margin-left: 30px;">${item}</p>`).join('');
                return `<div><strong>${key}:</strong>${arrayValuesHTML}</div>`;
            } else {
                return `<div><strong>${key}:</strong> ${value}</div>`;
            }
        })
        .join('');
}

document.querySelector('.delete').addEventListener('click', function() {
    resultBlock.style.visibility = 'hidden';
    queryInput.value = '';
    queryInputId.value = '';
});

queryInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        document.getElementById('byQueryBtn').click();
    }
});

queryInputId.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        document.getElementById('byQueryBtnId').click();
    }
});