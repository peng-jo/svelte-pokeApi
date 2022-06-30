<script lang="ts">
import { onMount } from "svelte";

import type { PokemonDesc, PokemonInfo } from "./pokeInfo";
import { desc } from "./store";
import { isMobile } from "./util/tools";


export let id: number;
export let name: string;
let mobile: boolean;
let pokeName = "";
$: {fetchPokemonApi(name)}

onMount(()=>{
  mobile = isMobile(window.navigator.userAgent);
});

const fetchPokemonApi = async(name: string) => {
  await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
  .then( res => res.json())
  .then((data) => {
    pokeName = data.names.find(v => v.language.name === "ko").name
    console.log(data.names.find(v => v.language.name === "ko").name);
    $desc = data.flavor_text_entries.reduce((acc: PokemonInfo[], cur) => {
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
    }, []).reduce((acc: PokemonDesc[], cur: PokemonInfo) => {
      acc[cur.version] ? acc[cur.version].push(cur.desc) : acc[cur.version] = [cur.desc];
      return acc;
    }, {});
  })
}
</script>
<div class="poke-cont">
  <div class="name-cont">
      {#if mobile}
        <div class="mobile name-cont">
          <h1>{pokeName}</h1>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name}/>
        </div>
      {:else}
        <h1>{pokeName}</h1>
      {/if}
    <div class="desc">
      {#each Object.entries($desc) as [title, pokemonDesc]}
        <div class="title">포켓몬스터 {title}</div>
        {#each pokemonDesc as desc}
          <p>{desc}</p>
        {/each}
      {/each}
    </div>
  </div>
  <div class="img-cont">
    {#if !mobile}
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`} alt={name}/>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name}/>
    {/if}
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
  .poke-cont .name-cont.mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .poke-cont .desc .title {
    font-weight: bold;
    margin-bottom: 4px;
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
  @media (max-width: 720px) {
    .poke-cont .img-cont img {
      width: 50px;
      height: 50px;
    }
    .poke-cont .desc > p {
      font-size: 11px;
    }
  }
</style>