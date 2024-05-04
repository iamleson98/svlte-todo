<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toastStore } from '$lib/components/toast/index.js';
	import type { ActionData } from './$types.js';
	import './style.css';
	export let data;

	export let form: ActionData;

	async function handleSubmit(event: { currentTarget: HTMLFormElement }) {
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: event.currentTarget.method,
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<svelte:head>
	<title>Todos</title>
	<meta name="description" content="todos available" />
</svelte:head>
<div class="container">
	<div class="todo">
		<div class="menu">
			<div class="past">
				<img
					src="https://cdn-icons-png.flaticon.com/128/2443/2443649.png"
					alt=""
					style="width: 30px; height: 30px"
				/>
				<p>past</p>
			</div>
			<div class="past">
				<img
					src="https://cdn-icons-png.flaticon.com/128/5776/5776730.png"
					alt=""
					style="width: 30px; height: 30px"
				/>
				<p>today</p>
			</div>
			<div class="past">
				<img
					src="https://cdn-icons-png.flaticon.com/128/3967/3967265.png"
					alt=""
					style="width: 30px; height: 30px"
				/>
				<p>future</p>
			</div>
		</div>
		<div class="manage">
			<div class="tableList"></div>
			<div class="todoList">
				<form
					class="addTodo"
					method="post"
					action="?/addTodo"
					on:submit|preventDefault={handleSubmit}
				>
					<input type="text" name="todo" class="edAdd" placeholder="enter your todo" required />
					<input type="submit" class="btnAdd" value="Add" />
				</form>
				<div class="list">
					{#if !data.todos.length}
						<p>No todos</p>
					{:else}
						<div>
							{#each data.todos as todo (todo.id)}
								<div class="itemTodo">
									<p style="margin-right: auto;">{todo.title}</p>
									<input type="checkbox" name="" id="" style="height: 15px; width: 15px" />
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="detailTodo">
		<div class="title"></div>
		<div class="detail">
			<div class="time">
				<div class="detailTime">
					<img
						src="https://cdn-icons-png.flaticon.com/128/14991/14991711.png"
						alt=""
						style="width: 30px; height: 30px"
					/>
					<input type="text" class="edTime" placeholder="enter day" />
				</div>
				<div class="detailTime">
					<img
						src="https://cdn-icons-png.flaticon.com/128/2779/2779780.png"
						alt=""
						style="width: 30px; height: 30px"
					/>
					<input type="text" class="edTime" placeholder="enter hour" />
				</div>
			</div>

			<div class="edContent">
				<input type="text" class="content" placeholder="enter content" />
				<img
					src="https://cdn-icons-png.flaticon.com/128/3161/3161597.png"
					alt=""
					style="width: 30px; height: 30px;"
				/>
			</div>
		</div>
	</div>
</div>

{#if form?.code === 201}{() =>
		toastStore.send({ message: 'added todo', variant: 'success', timeout: 3000 })}
{:else if form?.code && [400, 500].includes(form.code)}
	<p class="p-2 text-red-500 bg-red-100">{form?.message}</p>
{/if}
