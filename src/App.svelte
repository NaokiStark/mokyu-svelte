<script>
	import { Router, Route } from "svelte-navigator";
	import Header from "./components/header.svelte";
	import Login from "./routes/login.svelte";
	import Mi from "./routes/mi.svelte";
	import MiSingle from "./routes/mi_single.svelte";
	import Register from "./routes/register.svelte";
	import Profile from "./routes/profile.svelte";
	import { api_request, checkLogin } from "./api.js";
	import { onMount } from "svelte";
	import Posts from "./routes/posts.svelte";
	import Communities from "./routes/communities.svelte";
	import Community from "./routes/community.svelte";
	import Post from "./routes/post.svelte";
	import Explore from "./routes/Explore.svelte";
	import { Body } from "svelte-body"; // weird
	import Notificaciones from "./routes/notificaciones.svelte";

	const site_name = "Emburns";

	let site_config = {};
	let user_data = null;
	onMount(async () => {
		site_config = await api_request("site_config");
		site_config = site_config;
		let response_user_data = await checkLogin();
		if (response_user_data) {
			user_data = JSON.parse(localStorage.userData);
		}
	});

	let site = "register";

	let site_background = "url('/pics/20364222.jpg') no-repeat fixed";
</script>

<svelte:head>
	<title>{site_name}</title>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
		crossorigin="anonymous"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css"
	/>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
	/>

	<link
		href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Router>
	<main class="container-fluid mx-0 px-0">
		<Route path="/">
			<Header bind:user_data />

			{#if user_data}
				<Mi {site_config} bind:user_data />
			{:else}
				<Explore {site_config} bind:user_data />
			{/if}
		</Route>

		<Route path="/explorar">
			<Header bind:user_data />

			<Explore {site_config} bind:user_data search={false} />
		</Route>

		<Route path="login">
			<Header bind:user_data />

			<Login {site_config} />
		</Route>

		<Route path="register">
			<Header bind:user_data />

			<Register {site_config} />
		</Route>

		<Route path="shout/:id" let:params>
			<Header bind:user_data />

			<MiSingle shout_id={params.id} bind:site_config bind:user_data />
		</Route>

		<Route path="posts">
			<Header bind:user_data />

			<Posts bind:site_config />
		</Route>

		<Route path="posts/:cat" let:params>
			<Header bind:user_data />

			<Posts bind:site_config category={params.cat} />
		</Route>
		<Route path="comunidades">
			<Header bind:user_data />

			<Communities bind:site_config />
		</Route>

		<Route path="comunidad/:id" let:params>
			<Header bind:user_data />
			<Community bind:site_config commid={params.id} />
		</Route>

		<Route path="tema/:id" let:params>
			<Header bind:user_data />

			<Post post_id={params.id} bind:site_config />
		</Route>

		<Route path="buscar/:search" let:params>
			<Header bind:user_data />

			<Explore
				{site_config}
				bind:user_data
				search={true}
				search_query={params.search}
			/>
		</Route>

		<Route path="notificaciones" let:params>
			<Header bind:user_data />

			<Notificaciones {site_config} bind:user_data />
		</Route>
		<Route path="/:id" let:params>
			<Header bind:user_data />

			<Profile username={params.id} bind:site_config bind:user_data />
		</Route>
	</main>
</Router>

<style>
	.avatar {
		width: 50px;
		height: 50px;
	}

	/* PUT ALL THIS STYLES LATER IN A FILE, please, ADD VARS */
	:global(*:not(.material-icons)) {
		font-family: "Nunito", sans-serif !important;
	}
	:global(.btn) {
		border: 1px solid rgba(255, 255, 255, 0.125) !important;
	}
	:global(.btn-primary) {
		background-color: rgb(252, 107, 71) !important;
		border-color: rgb(180, 76, 50) !important;
		color: rgb(253, 252, 252) !important;
	}
	:global(.btn-primary:hover) {
		background-color: rgb(247, 122, 91) !important;
		border-color: rgb(180, 76, 50) !important;
		color: rgb(253, 252, 252) !important;
	}
	:global(.btn-outline-primary) {
		border-color: rgb(180, 76, 50) !important;
		color: rgb(180, 76, 50) !important;
	}
	:global(.btn-outline-primary:hover) {
		background-color: rgb(252, 107, 71) !important;
		border-color: rgb(180, 76, 50) !important;
		color: rgb(253, 252, 252) !important;
	}
	:global(.cursor-pointer) {
		cursor: pointer !important;
	}
	:global(form.login, form.register) {
		border: 1px solid #6c757d;
		padding: 2em;
		border-radius: 5px;
	}
	:global(body) {
		/*background: url(/pics/20364222.jpg) no-repeat fixed;*/
		background-size: cover;
		background-position: center;
	}
	:global(body, html) {
		height: 100%;
	}
	:global(.text-muted-alt) {
		color: #9fadbb !important;
	}
	:global(.text-muted-alt-alt) {
		color: #d2d8df !important;
	}
	:global(.badge-primary) {
		background-color: rgb(252, 107, 71) !important;
		color: white !important;
	}

	:global(.form-control:focus) {
		border-color: #d99357 !important;
		box-shadow: 0 0 3px 0.2rem #d9935742 !important;
	}

	:global(a:hover) {
		text-decoration: none !important;
	}

	:global(.link-primary) {
		color: rgb(252, 107, 71) !important;
	}

	:global(.text-link, .text-link:hover, .text-link:active, .text-link:focus) {
		color: rgb(252, 107, 71) !important;
		font-weight: bold im !important;
	}
	:global(.img-fluid) {
		max-width: 100%;
	}

	:global(
			.btn-primary.focus,
			.btn-primary:focus,
			h1:focus,
			h3:focus,
			h4:focus
		) {
		box-shadow: none !important;
	}
</style>
