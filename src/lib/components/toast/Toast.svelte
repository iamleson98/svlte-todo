<script lang="ts">
	import { flip } from 'svelte/animate';
	import { toastStore } from './store';
	import { fly } from 'svelte/transition';
</script>

<div class="notifications">
	{#each $toastStore as notification (notification.id)}
		<div animate:flip class={`toast toast-${notification.variant}`} transition:fly={{ x: 30 }}>
			<div class="content">{notification.message}</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.notifications {
		@apply fixed top-2 z-[99999] flex flex-col justify-start items-center pointer-events-none p-0 my-0 right-6;
	}
	.toast {
		flex: 0 0 auto;
		@apply mb-2 rounded-sm;
	}
	.toast-info {
		@apply bg-blue-500;
	}
	.toast-warning {
		@apply bg-orange-500;
	}
	.toast-error {
		@apply bg-red-500;
	}
	.toast-success {
		@apply bg-green-500;
	}
	.content {
		@apply p-2 block text-white font-medium;
	}
</style>
