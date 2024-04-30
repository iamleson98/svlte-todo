<script>
	import { Toast } from '$lib/components';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<Toast />
