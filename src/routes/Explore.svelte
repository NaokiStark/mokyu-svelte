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

    export let search = false;
    export let search_query = "";
    $: search_query, refreshInfiniteScroll();

    let feedList = {
        info: { page: 0 },
        data: [],
    };

    let page = 0;

    let explore_type = "recent";
    let infiniteId = Symbol();

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
        if (!search) {
            api_request(`Feed/list?type=${explore_type}&page=${page}`).then(
                (x) => {
                    if (x.length > 0) {
                        feedList.data = [...feedList.data, ...x];
                        page += 1;
                        feedList.info.page = page;

                        loaded();
                    } else {
                        complete();
                    }
                }
            );
        } else {
            api_request(`Feed/search?query=${search_query}&page=${page}`).then(
                (x) => {
                    if (x.length > 0) {
                        feedList.data = [...feedList.data, ...x];
                        page += 1;
                        feedList.info.page = page;

                        loaded();
                    } else {
                        complete();
                    }
                }
            );
        }
    }

    function changeType(type, _action) {
        explore_type = type;
        action = _action;
        //refresh scroll
        refreshInfiniteScroll();
    }

    function refreshInfiniteScroll() {
        page = 0;
        feedList.data = [];
        infiniteId = Symbol();
    }
</script>

<div class="row mx-0 mt-3">
    <div class="col-lg-1 col-xl-2" />

    <div class="col-lg-7 col-xl-5">
        {#if !search}
            <div class="card" style="height: 100%;">
                <div class="card-header">
                    <Gicon icon="explore" /> Explora en Emburns
                </div>
                <div class="card-body d-flex align-items-center">
                    <button
                        title="Muestra shouts más recientes"
                        class="ml-1 btn {action == 0 ? 'btn-primary' : ''}"
                        on:click={() => changeType("recent", 0)}
                    >
                        <Gicon icon="more_time" /> Más reciente
                    </button>
                    <button
                        title="Muestra shouts más destacados de hoy"
                        class="ml-1 btn {action == 1 ? 'btn-primary' : ''}"
                        on:click={() => changeType("trending", 1)}
                    >
                        <Gicon icon="auto_awesome" /> Destacado
                    </button>
                    <button
                        title="Muestra shouts con multimedia más recientes"
                        class="ml-1 btn {action == 2 ? 'btn-primary' : ''}"
                        on:click={() => changeType("media", 2)}
                    >
                        <Gicon icon="art_track" /> Multimedia
                    </button>
                </div>
            </div>
        {:else}
            <div class="card" style="height: 100%;">
                <div class="card-header">
                    <Gicon icon="explore" /> Búsqueda
                </div>
                <div class="card-body d-flex align-items-center">
                    Resultados para: {decodeURIComponent(search_query)}
                </div>
            </div>
        {/if}
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
        {:else if user_data}
            <div
                class="card text-white"
                in:fly={{ opacity: 0, x: 50, duration: 300 }}
            >
                <div
                    class="card-header d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                    style="background-image: url('{user_data.cover}')"
                >
                    <div class="d-flex flex-row card-user-info">
                        <a
                            class="text-white"
                            use:link
                            href="/{user_data.username}"
                        >
                            <img
                                src={user_data.avatar
                                    ? user_data.avatar
                                    : `${backendRoot}style/default.png`}
                                alt="Avatar de {user_data.username}"
                                class="avatar rounded-circle mr-2"
                                on:error={function () {
                                    this.src = `${backendRoot}style/default.png`;
                                }}
                            />
                        </a>
                        <div class="d-flex flex-column">
                            <span class="user-info">
                                <a
                                    class="text-white"
                                    use:link
                                    href="/{user_data.username}"
                                >
                                    <b>{user_data.username}</b>
                                </a></span
                            >
                            <small>
                                <b>{user_data.rankName}</b>
                                <span class="name"
                                    >({user_data.rank} karma)
                                </span>
                            </small>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        {user_data.quote}
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>
<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1 col-xl-2" />
    <div class="col-lg-7 col-xl-5 mb-3">
        <FeedList {feedList} bind:site_config options={feedlist_options} />
        <InfiniteLoading
            spinner="wavedots"
            on:infinite={infiniteHandler}
            identifier={infiniteId}
        />
    </div>
    <div class="col-lg-3 col-xl-3">
        <div class="sticky-top">
            <div class="card mt-2">
                <div class="card-header">
                    <Gicon icon="tag" /> Tendencias
                </div>

                <div class="card-body">
                    <ul class="hashtags-container">
                        {#each hashtags as hashtag}
                            <li>
                                <a
                                    class="text-link"
                                    href="/buscar/{encodeURIComponent(hashtag)}"
                                >
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
    .card-header-with-cover {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 16vh;
        padding: 0;
        margin: 0;
    }
    .card-user-info {
        width: 100%;
        margin: 0;
        padding: 0.75rem 1.25rem;
        background: rgb(2, 0, 36);
        background: linear-gradient(
            0deg,
            #212529 40%,
            rgba(255, 255, 255, 0) 100%
        );
        margin-bottom: -1px;
    }
    .hashtags-container {
        list-style: none;
    }
</style>
