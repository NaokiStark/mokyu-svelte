<script>
    import FeedItem from "../components/feedItem.svelte";
    import FeedItemPlaceholder from "../components/feedItemPlaceholder.svelte";
    import { fly, fade } from "svelte/transition";
    import { api_request, backendRoot } from "../api.js";

    import CommentsList from "../components/commentsList.svelte";
    import { Body } from "svelte-body"; // weird
    import { link } from "svelte-navigator";
    import Gicon from "../components/gicon.svelte";
    export let site_config;
    export let shout_id = 0;
    export let user_data;

    let item = null;

    $: get_shout(shout_id).then((x) => {
        item = x;
    });

    function get_shout(sid) {
        return api_request(`Feed/?id=${sid}`);
    }

    let hashtags = [
        "Emburns",
        "#Pruebas",
        "#Emburns",
        "#ElonCompraEmburns",
        "#Toringa",
        "#ElFacha",
    ];

    let commentListOptions = {
        infinite_scroll: true,
        items_per_page: 2000,
        sharebox: user_data ? true : false,
        show_3x3: false,
    };

    $: {
        commentListOptions.sharebox = user_data ? true : false;
    }
</script>

{#if item}
    {#if item.user.background}
        <Body
            style=" background: url('{item.user
                .background}') no-repeat fixed;background-size: cover;background-position: center;"
        />
    {/if}
{/if}
<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1 col-xl-2" />
    <div class="col-lg-5 col-xl-5 mt-2 mx-0 px-0">
        {#if item}
            <FeedItem {item} bind:site_config />
            <CommentsList
                bind:feedList={item.comments}
                bind:site_config
                bind:user_data
                bind:options={commentListOptions}
                bind:feedId={shout_id}
            />
        {:else}
            <FeedItemPlaceholder />
        {/if}
    </div>
    <div class="col-lg-3 col-xl-3">
        <div class="sticky-top">
            {#if item}
                <div
                    class="card mt-3 text-white"
                    in:fly={{ opacity: 0, x: 50, duration: 300 }}
                >
                    <div
                        class="card-header d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                        style="background-image: url('{item.user.cover}')"
                    >
                        <div class="d-flex flex-row card-user-info">
                            <a
                                class="text-white"
                                use:link
                                href="/{item.user.username}"
                            >
                                <img
                                    src={item.user.avatar
                                        ? item.user.avatar
                                        : `${backendRoot}style/default.png`}
                                    alt="Avatar de {item.user.username}"
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
                                        href="/{item.user.username}"
                                    >
                                        <b>{item.user.username}</b>
                                    </a></span
                                >
                                <small>
                                    <b>{item.user.rankName}</b>
                                    <span class="name"
                                        >({item.user.rank} karma)
                                    </span>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {item.user.quote}
                        </p>
                    </div>
                </div>

                <div
                    class="card mt-2"
                    in:fly={{ opacity: 0, x: 50, duration: 300, delay: 100 }}
                >
                    <div class="card-header">
                        <Gicon icon="tag" /> Tendencias
                    </div>

                    <div class="card-body">
                        <ul class="hashtags-container">
                            {#each hashtags as hashtag}
                                <li>
                                    <a
                                        class="text-link"
                                        href="/buscar/{encodeURIComponent(
                                            hashtag
                                        )}"
                                    >
                                        {hashtag}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>

                <div
                    class="card mt-2"
                    in:fly={{ opacity: 0, x: 50, duration: 300, delay: 200 }}
                >
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
            {/if}
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
