const container = document.getElementById('container');
    const pokemons_number = 150;
    const colors = {
        bug: '#e7ffc7', dragon: '#d9e0ff', electric: '#fffdde', fairy: '#fce1fa', fighting: '#ebe6df', fire: '#ffdbdb', flying: '#ebf4f5', grass: '#d1ffe1', ground: '#f4e7da', normal: '#F5F5F5', poison: '#d6c7ff', psychic: '#dbbae0', rock: '#e6cfa8', water: '#dbf5ff'
    };
    const main_types = Object.keys(colors);

    const fetchPokemons = async () => {
        for (let i = 1; i <= pokemons_number; i++) {
            await getPokemon(i);
        }
    };

    const getPokemon = async id => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const data = await fetch(url);
        const pokemon = await data.json();
        createPokemonCard(pokemon);
    };

    function createPokemonCard(pokemon) {
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon');

        const poke_types = pokemon.types.map(type => type.type.name);
        const type = main_types.find(type => poke_types.indexOf(type) > -1);
        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        const color = colors[type];

        pokemonElement.style.backgroundColor = color;

        const pokeInnerHTML = `
        <a href="https://pokedex.org/#/pokemon/${pokemon.id}"><div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" /></a>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type"><span>${type}</span></small>
        </div>
    `;

        pokemonElement.innerHTML = pokeInnerHTML;
        container.appendChild(pokemonElement);
    }

    fetchPokemons();


    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); //add this
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); //add this
        }
    }

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }