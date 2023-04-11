<script>
    import FeedList from "../components/feedList.svelte";
    import { fly } from "svelte/transition";
    import { api_request } from "../api.js";
    import { onMount } from "svelte";
    import InfiniteLoading from "svelte-infinite-loading";
    import Gicon from "../components/gicon.svelte";

    export let site_config;
    export let user_data;

    let feedList = {
        info: { page: 0 },
        data: [],
    };

    let hashtags = [
        "Emburns",
        "#Pruebas",
        "#Emburns",
        "#ElonCompraEmburns",
        "#Toringa",
        "#ElFacha",
    ];

    let page = 0;
    /*
    $: get_publico(page).then((x) => {
        feedList.data = x.data;
    });

    function get_publico(cpage) {
        return api_request(`publico?limit=20&page=${cpage}`);
    }
*/

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

<div class="row row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1 col-xl-2" />
    <div class="col-lg-7 col-xl-5">
        <FeedList {feedList} bind:site_config bind:user_data />
        <InfiniteLoading spinner="wavedots" on:infinite={infiniteHandler} />
    </div>
    <div class="col-lg-3 col-xl-3">
        <div class="card mt-2">
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

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
    .hashtags-container {
        list-style: none;
    }
</style>
