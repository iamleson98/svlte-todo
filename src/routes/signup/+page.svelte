<script lang="ts">
	import type { User } from "$lib/db";
	// import { _signup } from "./+page.server";
	import "./style.css";
	let username: string;
	let password: string;
	let confirmpassword: string;

	async function signupUser(userData: User) {
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const data = await response.json();
            console.log(data);
            if (data.success) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }

	async function handleSignup() {
		if (password !== confirmpassword) {
			alert('Password and Confirm Password are not the same');
			return;
		}

		const userObject: User = {
			id: 0,
			user_name: username,
			avatar: 'https://cdn-icons-png.flaticon.com/128/1326/1326377.png',
			created_at: new Date().toISOString(),
			is_active: 1,
			password: password
		};

		await signupUser(userObject);

		// await _signup(userObject);

		username = '';
		password = '';
		confirmpassword = '';
	}
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
						bind:value={username}
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
						bind:value={password}
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
						bind:value={confirmpassword}
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