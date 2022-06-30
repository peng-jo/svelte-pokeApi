import { writable } from "svelte/store";
import type { PokemonDesc } from "./pokeInfo";

export const page = writable(0)

export const poke = writable([])

export const desc = writable<PokemonDesc>({});
