const express = require("express");
const router = express.Router();

const pokemons = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
  {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
  },
  {
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon/4/",
  },
  {
    name: "charmeleon",
    url: "https://pokeapi.co/api/v2/pokemon/5/",
  },
  {
    name: "charizard",
    url: "https://pokeapi.co/api/v2/pokemon/6/",
  },
  {
    name: "squirtle",
    url: "https://pokeapi.co/api/v2/pokemon/7/",
  },
  {
    name: "wartortle",
    url: "https://pokeapi.co/api/v2/pokemon/8/",
  },
  {
    name: "blastoise",
    url: "https://pokeapi.co/api/v2/pokemon/9/",
  },
];

// GET pokemons listing
router.get("/", function (req, res, next) {
  console.log(pokemons);
  res.send(pokemons);
});

// POST pokemon to the list
router.post("/add", (req, res, next) => {
  console.log(req.body);
  pokemons.push(req.body);
  console.log(pokemons);
  res.send(`${req.body.name} added to the list`);
});

// DELETE pokemon from the list
router.delete("/delete/:name", (req, res, next) => {
  const pokemon = pokemons.find((pokemon) => pokemon.name === req.params.name);
  if (!pokemon) {
    res.send("Pokemon not found");
  } else {
    pokemons.splice(pokemons.indexOf(pokemon), 1);
    res.send(`${req.params.name} removed from the list`);
  }
});

// UPDATE pokemon from the list
router.put("/update/:name", (req, res, next) => {
  const pokemon = pokemons.find((pokemon) => pokemon.name === req.params.name);
  if (!pokemon) {
    res.send("Pokemon not found");
  } else {
    const updatedPokemon = { name: req.body.updatedName, url: pokemon.url };
    pokemons[pokemons.indexOf(pokemon)] = updatedPokemon;
    res.send(`${req.params.name} updated`);
  }
});

module.exports = router;
