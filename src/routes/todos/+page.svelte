<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import './style.css';
	export let data;

	let selectedTodo: number | null = null;

	async function handleSubmit(event: { currentTarget: HTMLFormElement }) {
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: event.currentTarget.method,
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	}

	function showDetail(todo: number) {
		selectedTodo = todo;
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
								{#if todo.status === 0}
									<button class="itemTodo" on:click={() => showDetail(todo.id)}>
										<p style="margin-right: auto;">{todo.title}</p>
										<input type="checkbox" name="status" style="height: 15px; width: 15px" />
									</button>
								{:else}
									<button class="itemTodoComplete" on:click={() => showDetail(todo.id)}>
										<p style="margin-right: auto;">{todo.title}</p>
										<input
											type="checkbox"
											name="status"
											style="height: 15px; width: 15px;"
											checked
										/>
									</button>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="detailTodo">
		{#if selectedTodo !== null}
			{#each data.todos as todo}
				{#if todo.id === selectedTodo}
					<div class="title">{todo.title}</div>
					<div class="detail">
						<div class="time">
							<div class="detailTime">
								<img
									src="https://cdn-icons-png.flaticon.com/128/14991/14991711.png"
									alt=""
									style="width: 30px; height: 30px"
								/>
								<p class="edTime">{new Date(todo.created_at).toLocaleDateString()}</p>
							</div>
							<div class="detailTime">
								<img
									src="https://cdn-icons-png.flaticon.com/128/2779/2779780.png"
									alt=""
									style="width: 30px; height: 30px"
								/>
								<p class="edTime" placeholder="enter hour">
									{new Date(todo.created_at).toLocaleTimeString()}
								</p>
							</div>
						</div>

						<form
							class="edContent"
							method="post"
							action="?/updateContent"
							on:submit|preventDefault={handleSubmit}
						>
							<input type="hidden" name="todoId" value={selectedTodo} />
							<input
								type="text"
								class="content"
								placeholder="enter content"
								name="content"
								value={todo.content || ''}
								required
							/>
							<button type="submit"
								><img
									src="https://cdn-icons-png.flaticon.com/128/3161/3161597.png"
									alt=""
									style="width: 30px; height: 30px;"
								/></button
							>
						</form>
						<div class="detailContent">
							{#if !todo.content}
								<p></p>
							{:else}
								<p class="contentDiv">{todo.content}</p>
							{/if}
						</div>

						<button class="btnok">hi</button>
					</div>
				{/if}
			{/each}
		{:else}
			<div class="title"></div>
			<div class="detail">
				<p>no item selected</p>
			</div>
		{/if}
	</div>
</div>
