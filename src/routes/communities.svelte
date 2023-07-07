<script>
    import Gicon from "../components/gicon.svelte";
    import { api_request } from "../api.js";
    import { fly } from "svelte/transition";
    import PostListItem from "../components/postListItem.svelte";
    import { link } from "svelte-navigator";
    import InfiniteLoading from "svelte-infinite-loading";

    export let site_config;

    let post_list = [];
    let page = 0;

    /*
    $: get_post_list().then((x) => {
        post_list = x.data;
    });

    function get_post_list() {
        return api_request(`communitiesFeed`);
    }*/

    let infiniteId = Symbol();
    function refreshInfinite() {
        page = 0;
        post_list = [];
        infiniteId = Symbol();
    }

    function infiniteHandler({ detail: { loaded, complete } }) {
        api_request(`community/posts?community=0&limit=10&page=${page}`).then(
            (x) => {
                if (x.length > 0) {
                    post_list = [...post_list, ...x];
                    page += 1;
                    loaded();
                } else {
                    complete();
                }
            }
        );
    }
</script>

<div class="row row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1 col-xl-2" />
    <div class="col-lg-5 col-xl-5 mt-2 mx-0 px-0">
        <div class="card mt-2">
            <div class="card-header">
                <b><Gicon icon="info" /> Info</b>
            </div>
            <div class="card-body">
                Las comunidades son una forma de interactuar colaborativa. Podés
                navegar, interactuar o crear tu comunidad!
            </div>
        </div>
    </div>
</div>
<div class="row row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1 col-xl-2" />
    <div class="col-lg-5 col-xl-5 mt-2 mx-0 px-0">
        <div class="card mt-2">
            <div class="card-header">
                <b><Gicon icon="newspaper" /> Últimos temas</b>
            </div>
            <div class="card-body">
                <ul class="post-list">
                    {#if post_list}
                        {#each post_list as post}
                            <li>
                                <PostListItem {post} />
                            </li>
                        {/each}
                    {/if}
                    <InfiniteLoading
                        spinner="wavedots"
                        on:infinite={infiniteHandler}
                        identifier={infiniteId}
                    />
                </ul>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-xl-3">
        <div class="card mt-2">
            <div class="card-header">
                <b><Gicon icon="hotel_class" /> Comunidades destacadas</b>
            </div>
            <div class="card-body">
                <ul class="last-comments-section">
                    {#each { length: 1 } as _}
                        <li>
                            <a use:link href="/comunidad/1">
                                <span
                                    style="background: url(https://xtremeretro.com/wp-content/uploads/2017/05/Nintendo-Famicom-Pixel-Art-Xteme-Retro.png) no-repeat"
                                    class="post-thumbnail"
                                />
                                <div
                                    class="d-flex flex-column ml-1 post-details"
                                >
                                    <span class="post-title"
                                        >Juegos Family - NES</span
                                    >
                                    <small class="text-muted-alt"
                                        >Comunidad para juegos exclusivos de
                                        Family - NES</small
                                    >
                                    <span class="text-muted-alt">
                                        <span class="badge badge-primary">
                                            🎮 Juegos
                                        </span>
                                    </span>
                                </div>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    ul.post-list,
    .last-comments-section {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .post-list li,
    .last-comments-section li {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0.5em;
    }

    .post-details {
        max-width: 75%;
        text-decoration: none !important;
    }
    .post-thumbnail {
        display: inline-block;
        width: 80px;
        height: 80px;
        background-size: cover !important;
        background-position: center !important;
        border-radius: 5px;
        margin-right: 0.2em;
    }
    .post-title {
        text-overflow: ellipsis;
        max-width: 100%;
        word-break: break-all;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        color: #e9ecef;
        text-decoration: none !important;
    }

    .last-comments-section li a {
        text-decoration: none !important;
    }

    @media (max-width: 720px) {
        .post-thumbnail {
            width: 100%;
            height: 100px;
            margin-bottom: 0.5em;
        }
        .post-details {
            max-width: 100%;
        }
    }
</style>
