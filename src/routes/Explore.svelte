<script>
    import FeedList from "../components/feedList.svelte";
    import { fly } from "svelte/transition";
    import { api_request } from "../api.js";
    import { onMount } from "svelte";
    import InfiniteLoading from "svelte-infinite-loading";
    import Gicon from "../components/gicon.svelte";
    import { link, useLocation } from "svelte-navigator";

    export let site_config;

    export let user_data;

    let feedList = {
        info: { page: 0 },
        data: [],
    };

    let page = 0;

    let feedlist_options = {
        infinite_scroll: true,
        items_per_page: 2000,
        sharebox: false,
        show_3x3: false,
    };

    let hashtags = [
        "Emburns",
        "#Pruebas",
        "#Emburns",
        "#ElonCompraEmburns",
        "#Toringa",
        "#ElFacha",
    ];

    let action = 0;

    function infiniteHandler({ detail: { loaded, complete } }) {
        api_request(`Feed/list?page=${page}`).then((x) => {
            if (x.length > 0) {
                feedList.data = [...feedList.data, ...x];
                page += 1;
                feedList.info.page = page;

                loaded();
            } else {
                complete();
            }
        });
    }
</script>

<div class="row mx-0 mt-1">
    <div class="col-lg-1 col-xl-2" />

    <div class="col-lg-7 col-xl-5">
        <div class="card" style="height: 100%;">
            <div class="card-header">
                <Gicon icon="explore" /> Explora en Emburns
            </div>
            <div class="card-body d-flex align-items-center">
                <button
                    title="Muestra shouts más recientes"
                    class="ml-1 btn {action == 0 ? 'btn-primary' : ''}"
                    on:click={() => (action = 0)}
                >
                    <Gicon icon="more_time" /> Más reciente
                </button>
                <button
                    title="Muestra shouts más destacados de hoy"
                    class="ml-1 btn {action == 1 ? 'btn-primary' : ''}"
                    on:click={() => (action = 1)}
                >
                    <Gicon icon="auto_awesome" /> Destacado
                </button>
                <button
                    title="Muestra shouts con multimedia más recientes"
                    class="ml-1 btn {action == 2 ? 'btn-primary' : ''}"
                    on:click={() => (action = 2)}
                >
                    <Gicon icon="art_track" /> Multimedia
                </button>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-xxl-3">
        {#if !user_data}
            <div class="card">
                <div class="card-header">
                    <Gicon icon="sms_failed" /> Hey
                </div>
                <div class="card-body">
                    Puedes <a use:link href="/login" class="btn">Ingresar</a> o
                    <a use:link href="/register" class="btn btn-primary"
                        >Registrarte</a
                    >
                    para poder interactuar en Emburns, además de poder elegir lo
                    que quieres ver.
                </div>
            </div>
        {/if}
    </div>
</div>
<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1 col-xl-2" />
    <div class="col-lg-7 col-xl-5 mb-3">
        <FeedList {feedList} bind:site_config options={feedlist_options} />
        <InfiniteLoading spinner="wavedots" on:infinite={infiniteHandler} />
    </div>
    <div class="col-lg-3 col-xl-3">
        <div class="sticky-top">
            <div class="card mt-3">
                <div class="card-header">
                    <Gicon icon="tag" /> Tendencias
                </div>

                <div class="card-body">
                    <ul class="hashtags-container">
                        {#each hashtags as hashtag}
                            <li>
                                <a class="text-link" href="/buscar/{hashtag}">
                                    {hashtag}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
            <div class="card mt-2">
                <div class="card-header">
                    <Gicon icon="tips_and_updates" /> Te puede interesar
                </div>
                <div class="card-body">
                    <img
                        src="https://media.tenor.com/Ecad-WCJg7oAAAAC/vamos-manaos-manaos.gif"
                        alt="manaos"
                        class="img-fluid"
                    />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
    .hashtags-container {
        list-style: none;
    }
</style>
