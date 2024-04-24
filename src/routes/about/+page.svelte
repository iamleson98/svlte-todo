<script lang="ts">
	import type {Person} from '$lib/db';
	let result: Person | string;

	async function roll() {
		const response = await fetch('/about');
		result = await response.json();
		console.log(result);
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<button on:click={roll}>
	Roll the dice
</button>

<p>{result}</p>

<!-- {#if typeof result === 'string'}
	<p>Error: {result}</p>
{:else}
	<p>
		Got person with id: {result.id} and name: {result.name}
	</p>
{/if} -->


