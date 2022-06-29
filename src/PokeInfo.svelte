<script lang="ts">
import { onMount } from "svelte";


export let id;
export let name;

let desc = [];
let pokeName = "";
$: {fechPokemonApi(name)};

const fechPokemonApi = async(name) => {
  await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
  .then( res => res.json())
  .then((data) => {
    pokeName = data.names.find(v => v.language.name === "ko").name
    console.log(data.names.find(v => v.language.name === "ko").name);
    desc = data.flavor_text_entries.reduce((acc, cur) => {
      if ( cur.language.name === "ko" 
      && acc.findIndex((v)=> v.version === cur.version.name) === -1 
      && acc.findIndex((v)=> v.desc === cur.flavor_text) === -1) {
        return acc.concat({
          version: cur.version.name,
          desc: cur.flavor_text
        });
      } else {
        return acc;
      }
    }, []).map(v => v.desc)
  })
}
</script>
<div class="poke-cont">
  <div class="name-cont">
    <h1>{pokeName}</h1>
    <div class="desc">
      {#each desc as desc}
        <p>{desc}</p>
      {/each}
    </div>
  </div>
  <div class="img-cont">
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`} alt={name}/>
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name}/>
  </div>
</div>
<style>
  .poke-cont {
    display: flex;
    margin-top: 30px;
  }
  .poke-cont .name-cont {
    flex: 1;
  }
  .poke-cont .name-cont > .desc {
    font-size: 16px;
    border-bottom: 3px solid #000;
    border-left: 7px solid #000;
    border-radius: 0 0 0 20px;
    margin-top: 10px;
    padding: 10px;
  }
  .poke-cont .desc > p {
    margin: 0;
    margin-bottom: 6px;
  }
  .poke-cont .img-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0;
  }
  .poke-cont .img-cont img {
    width: 150px;
    height: 150px;
  }
</style>