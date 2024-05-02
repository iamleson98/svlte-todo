<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';
	import './style.css';

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
	<title>Login</title>
	<meta name="description" content="todos available" />
</svelte:head>

<h1>Login</h1>

<div class="container">
	<div class="forms">
		<div class="form login">
			<span class="title">Login</span>
			<p class="text-danger mt-2"></p>
			{#if form?.code === 201}
				<p class="p-2 text-green-500 bg-green-100">{form?.message}</p>
			{:else if form?.code && [400, 500].includes(form.code)}
				<p class="p-2 text-red-500 bg-red-100">{form?.message}</p>
			{/if}
			<form method="post" action="?/login" on:submit|preventDefault={handleSubmit}>
				<div class="input-field">
					<input type="text" placeholder="Enter your username" name="username" required />
					<i class="uil uil-user"></i>
				</div>
				<div class="input-field">
					<input
						id="password"
						type="password"
						placeholder="Enter your password"
						name="password"
						required
						class="password"
					/>
					<i class="uil uil-lock icon"></i>
					<i class="uil uil-eye-slash showHidePw"></i>
				</div>

				<div class="checkbox-text">
					<div class="checkbox-content">
						<input type="checkbox" id="logCheck" name="chkRmb" />
						<label for="logCheck" class="text">Remember me</label>
					</div>
				</div>

				<div class="input-field button">
					<input type="submit" value="Login Now" />
				</div>
			</form>

			<div class="login-signup">
				<span class="text"
					>Not a member?
					<a href="/signup" class="text signup-text">Signup Now</a>
				</span>
			</div>
		</div>
	</div>
</div>
