<script lang="ts">
	import { onMount } from 'svelte';
	import { page, poke } from './store';
	import PokeInfo from './PokeInfo.svelte';

	const LIMIT = 10;
	const PAGEVIEW = 5;
	let pageNum = 0;
	let pageStart = 0;

	const fetchApi = async () => {
		return await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${$page * LIMIT}`)
		.then( res => res.json())
		.then((data)=> {
			pageNum = data.count % LIMIT;
			return data.results;
		})
		.catch(err => console.error(err));
	}
	onMount(async() => {
		$poke = await fetchApi();
	});
	const onClickPageButton = async(e: any) => {
		if(e.target.value === ">") {
			$page = $page + (PAGEVIEW - $page % PAGEVIEW);
		} else {
			$page = $page - (PAGEVIEW + $page % PAGEVIEW);
		}
		pageStart = $page;
		$poke = await fetchApi();
	}
	const onClickNumber = async(num) => {
		const pnum = parseInt(num);
		$page = pnum;
		$poke = await fetchApi();
	};
	// const onclick = () => {
	// 	console.log($page)
	// 	$page += 1;
	// }
</script>
<header>
	<div class="header-cont">
		<h1>현재 페이지 번호 : {$page}</h1>
		<div class="p-container">
			<input type="button" disabled={$page < PAGEVIEW} on:click={onClickPageButton} value={"<"}/>
			<ul>
			{#each Array(PAGEVIEW) as _, i}
					<li on:click={()=> onClickNumber(pageStart + i)} class:highlight={$page === pageStart + i}>{pageStart + i}</li>
			{/each}
			</ul>
			<input type="button" on:click={onClickPageButton} value={">"}/>
		</div>
	</div>
</header>


{#each $poke as poke, index}
	<div class="info-cont">
		<PokeInfo id={$page * LIMIT + index + 1} name={poke.name}/>
	</div>
{/each}
<style>
	* {
		font-family: 'DOSMyungjo';
	}
	header {
		width: 100%;
		height: 150px;
		display: flex;
		justify-content: center;
	}
	header .header-cont {
		width: 100%;
		background: #f3f3f3;
		position: fixed;
		display: flex;
		align-items: center;
		flex-direction: column;
		border-bottom: 2px solid #000;
	}
	.p-container input {
		cursor: pointer;
		margin: 20px 0;
    border: none;
    background-color: transparent;
		font-size: 30px;
  }
	.p-container {
		display: flex;
		justify-content: space-evenly;
	}
	ul {
		display: flex;
		justify-content: center;
    align-items: center;
		list-style: none;
	}
	ul > li {
		cursor: pointer;
		margin: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
		width: 30px;
    height: 30px;
	}
	.highlight {
		background-color: #000;
    color: white;
    border-radius: 50%;

	}
	.info-cont {
		width: 1200px;
		margin: 0 auto;
	}
	@media (max-width: 1190px) {
		.info-cont {
			width: 80%;
		}
	}
	.info-cont:last-child {
		margin-bottom: 20px;
	}
</style>