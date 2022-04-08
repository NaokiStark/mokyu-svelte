<script>
	import Header from "./components/header.svelte";
</script>

<Header />

<main class="container">
	<h3 class="text-xl font-bold underline">Hello world!</h3>
</main>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	html,
	body {
		margin: 0;
		padding: 0;
	}
	body {
		background-color: #1e2124;
	}
	.main-header,
	.header-menu {
		background-color: #232629;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	ul,
	ol,
	li,
	a,
	button,
	input,
	textarea,
	select {
		color: #fff;
	}
	button {
		background-color: #f26522;
	}
</style>
