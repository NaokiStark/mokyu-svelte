<script>
    import FeedList from "../components/feedList.svelte";
    import { fly } from "svelte/transition";
    import { api_request } from "../api.js";
    import { onMount } from "svelte";
    import InfiniteLoading from "svelte-infinite-loading";
    import Gicon from "../components/gicon.svelte";

    export let site_config;

    let feedList = {
        info: { page: 0 },
        data: [],
    };

    let page = 0;

    let feedlist_options = {
        infinite_scroll: true,
        items_per_page: 2000,
        sharebox: false,
        show_3x3: true,
    };

    let hashtags = [
        "Emburns",
        "#Pruebas",
        "#Emburns",
        "#ElonCompraEmburns",
        "#Toringa",
        "#ElFacha",
    ];

    function infiniteHandler({ detail: { loaded, complete } }) {
        api_request(`publico?limit=12&page=${page}`).then((x) => {
            if (x.data.length > 0) {
                feedList.data = [...feedList.data, ...x.data];
                page += 1;
                feedList.info.page = page;

                loaded();
            } else {
                complete();
            }
        });
    }
</script>

<div class="row row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-md-1" />
    <div class="col-md-7 mb-3">
        <FeedList {feedList} bind:site_config options={feedlist_options} />
        <InfiniteLoading spinner="wavedots" on:infinite={infiniteHandler} />
    </div>
    <div class="col-md-3 ">
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
