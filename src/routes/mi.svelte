<script>
    import FeedList from "../components/feedList.svelte";
    import { fly } from "svelte/transition";
    import { api_request } from "../api.js";
    import { onMount } from "svelte";
    export let site_config;

    let feedList = {
        info: { page: 0 },
        data: null,
    };

    $: get_publico().then((x) => {
        feedList.data = x.data;
    });

    function get_publico() {
        return api_request("publico");
    }
</script>

<div class="row row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-md-3">
        <!-- sidebar -->
        <div class="card mt-2 sticky-top">
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Debitis saepe dolorem facere numquam, optio, nobis corrupti
                    minima sit officiis mollitia nemo ut maiores ipsa modi quo
                    vel quam sapiente delectus.
                </p>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <FeedList {feedList} bind:site_config />
    </div>
    <div class="col-md-3">
        <div class="card mt-2 sticky-top">
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

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
</style>
