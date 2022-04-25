<script>
	import Header from "./components/header.svelte";
	import Mi from "./routes/mi.svelte";
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

<Header />

<main class="container-fluid">
	<div class="row">
		<div class="col-md-3">
			<!-- sidebar -->
			<div class="card mt-2">
				<div class="card-header d-flex">
					<img
						src="http://localhost/onics/uploads/1-1567136449_avatar.png"
						alt="Nekita's avatar"
						class="avatar rounded-circle mr-2"
					/>
					<div class="d-flex flex-column">
						<span class="user-info">Nekita</span>
						<small class="date">8.500 puntos</small>
					</div>
				</div>
				<div class="card-body">
					<p class="card-text">
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Debitis saepe dolorem facere numquam, optio, nobis
						corrupti minima sit officiis mollitia nemo ut maiores
						ipsa modi quo vel quam sapiente delectus.
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<Mi />
		</div>
		<div class="col-md-3">
			<div class="card mt-2">
				<div class="card-header">
					<h5>Esto no es Embers</h5>
				</div>
				<div class="card-body">
					<ul>
						<li>Ya lo dije</li>
						<li>Embers no va a volver</li>
						<li>Mokyu va a volver</li>
						<li>Mokyu va a cambiar de nombre?</li>
						<li>Es todo un misterio</li>
						<li>Tomatela te dije</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</main>

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
</style>
