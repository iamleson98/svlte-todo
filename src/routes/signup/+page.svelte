<script lang="ts">
	import "./style.css";
</script>

<svelte:head>
	<title>Signup</title>
	<meta name="description" content="signup available" />
</svelte:head>



<div class="container">
	<div class="forms">
		<div class="form login">
			<span class="title">SignUp</span>
			<p class="text-danger mt-2"></p>
			<form method="POST" action="?/register">
                <div class="input-field">
					<input
						type="text"
						placeholder="Enter your fullname"
						name="fullname"
						
						required
					/>
					<i class="uil uil-user"></i>
				</div>
				<div class="input-field">
					<input
						type="text"
						placeholder="Enter your username"
						name="username"
						required
					/>
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
                <div class="input-field">
					<input
					id="confirmpassword"
						type="password"
						placeholder="Enter your confirmpassword"
						name="confirmpassword"
						required
						class="password"
					/>
					<i class="uil uil-lock icon"></i>
					<i class="uil uil-eye-slash showHidePw"></i>
				</div>

				<div class="input-field button">
					<input
						type="submit"
						value="Signup Now"
					/>
				</div>
			</form>

			<div class="login-signup">
				<span class="text"
					>Have an Account
					<a href="/login" class="text signup-text">Login Now</a>
				</span>
			</div>
		</div>
	</div>
</div>