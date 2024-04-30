<script lang="ts">
	export let data;
	import './style.css';
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
			<form>
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
