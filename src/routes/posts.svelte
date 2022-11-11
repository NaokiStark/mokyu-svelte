<script>
    import FeedList from "../components/feedList.svelte";
    import Gicon from "../components/gicon.svelte";
    import { api_request } from "../api.js";
    import { fly } from "svelte/transition";
    import PostListItem from "../components/postListItem.svelte";
    export let site_config;
    export let category = "";

    let shout_list = {
        info: { page: 0 },
        data: null,
    };

    $: get_publico().then((x) => {
        shout_list.data = x.data;
    });

    function get_publico() {
        return api_request("publico");
    }
</script>

<div class="row row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-md-6 mb-3">
        <div class="card mt-2">
            <div class="card-header">
                <div
                    class="d-flex flex-row justify-content-between align-content-center align-items-center"
                >
                    <span><Gicon icon="newspaper" /> Últimos posts</span>
                    <div class="d-inline-flex flex-row justify-content-end">
                        <a href="new-post" class="btn btn-primary btn-sm">
                            <Gicon icon="create" /> Nuevo Post
                        </a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul class="post-list">
                    {#each { length: 10 } as _}
                        <li>
                            <PostListItem />
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-xxl-3">
        <div class="card mt-2">
            <div class="card-header">
                <Gicon icon="trending_up" /> Estadísticas
            </div>
            <div class="card-body">
                <div class="d-flex flex-column cursor-default">
                    <div class="d-flex flex-row justify-content-between">
                        <span>
                            <Gicon icon="people_alt" />
                            <b>25.352.052</b> miembros
                        </span>
                        <span>
                            <Gicon icon="feed" />
                            <b>17.059.371</b> posts
                        </span>
                    </div>
                    <div class="d-flex flex-row justify-content-between">
                        <span>
                            <Gicon icon="dynamic_feed" />
                            <b>260.270</b> Shouts
                        </span>
                        <span>
                            <Gicon icon="forum" />
                            <b>125.060.509</b> comentarios
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-2">
            <div class="card-header">
                <Gicon icon="forum" /> Últimos comentarios
            </div>
            <div class="card-body">
                <ul class="last-comments-section">
                    {#each { length: 5 } as _}
                        <li>
                            <span
                                style="background: url(http://localhost/onics/uploads/1-1559773776_anime_anime_girls_cat_girl_glitch_art_pink_artwork_digital_art-1469665.jpg) no-repeat"
                                class="post-thumbnail"
                            />
                            <div class="d-flex flex-column ml-1 post-details">
                                <span class="post-title"
                                    >@Nekita: que pedazo de post hermano mira si
                                    no lo va a ser</span
                                >
                                <small class="text-muted-alt-alt">
                                    Esto es una prueba, no se si ponerlo tipo
                                    lista
                                </small>
                                <span class="text-muted-alt">
                                    <span class="badge badge-primary">
                                        🖼️ Imágenes
                                    </span>
                                </span>
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
    <div class="d-none d-xxl-block col-xxl-3">
        <div class="card mt-2">
            <div class="card-header">
                <Gicon icon="campaign" /> Últimos shouts
            </div>
            <div class="card-body">
                <FeedList
                    options={{
                        infinite_scroll: false,
                        items_per_page: 3,
                        sharebox: false,
                    }}
                    {site_config}
                    bind:feedList={shout_list}
                />
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
    }

    @media (min-width: 1400px) {
        .col-xxl-3 {
            flex: 0 0 auto;
            width: 25%;
        }
        .d-xxl-block {
            display: block !important;
        }
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
