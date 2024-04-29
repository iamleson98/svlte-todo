<script lang="ts">
	import { toastStore } from '$lib/components/index.js';

	export let data;
</script>

<svelte:head>
	<title>Todos</title>
	<meta name="description" content="todos available" />
</svelte:head>

<h1>Todos</h1>
{#if !data.todos.length}
	<p>No todos</p>
{:else}
	<div>
		{#each data.todos as todo (todo.id)}
			<div>
				{todo.id}: {todo.title}
			</div>
			<p>{todo.content}</p>
			<p class="text-xs">{todo.created_at}</p>
		{/each}
	</div>
{/if}

<button
	on:click={() => toastStore.send({ message: 'added todo', variant: 'success', timeout: 3000 })}
	class="bg-blue-500 p-3 text-white"
>
	hello
</button>
