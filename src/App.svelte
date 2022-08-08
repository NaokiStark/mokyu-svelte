<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Header from "./components/header.svelte";
	import Login from "./routes/login.svelte";
	import Mi from "./routes/mi.svelte";
	import MiSingle from "./routes/mi_single.svelte";
	import Register from "./routes/register.svelte";
	import Profile from "./routes/profile.svelte";
	import { Body } from "svelte-body"; // weird
	let site = "register";

	let site_background = "url('/pics/20364222.jpg') no-repeat fixed";
</script>

<svelte:head>
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
	<Header />
	<main class="container-fluid mx-0 px-0">
		<Route path="/">
			<!-- more weirdest-->
			<Body
				style="background: {site_background};background-size: cover;background-position: center;"
			/>
			<Mi />
		</Route>
		<Route path="login">
			<!-- more weirdest-->
			<Body
				style="background: {site_background};background-size: cover;background-position: center;"
			/>
			<Login />
		</Route>

		<Route path="register">
			<!-- more weirdest-->
			<Body
				style="background: {site_background};background-size: cover;background-position: center;"
			/>
			<Register />
		</Route>
		<Route path="shout/:id" let:params>
			<MiSingle shout_id={params.id} />
		</Route>
		<Route path="/:id" let:params>
			<Profile username={params.id} />
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
</style>
