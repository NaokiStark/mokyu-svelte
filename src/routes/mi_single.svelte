<script>
    import FeedItem from "../components/feedItem.svelte";
    import FeedItemPlaceholder from "../components/feedItemPlaceholder.svelte";
    import { fly, fade } from "svelte/transition";
    import { api_request } from "../api.js";
    import CommentsList from "../components/commentsList.svelte";
    import { Body } from "svelte-body"; // weird
    import { link } from "svelte-navigator";
    export let site_config;
    export let shout_id = 0;

    let item = null;

    $: get_shout(shout_id).then((x) => {
        item = x.data;
    });

    function get_shout(sid) {
        return api_request(`feed/${sid}?comments`);
    }
</script>

{#if item}
    {#if item.background}
        <Body
            style=" background: url('{item.background}') no-repeat fixed;background-size: cover;background-position: center;"
        />
    {/if}
{/if}
<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1" />
    <div class="col-lg-6 mt-2 mx-0 px-0">
        {#if item}
            <FeedItem {item} bind:site_config />
            <CommentsList feedList={{ data: item.comments }} bind:site_config />
        {:else}
            <FeedItemPlaceholder />
        {/if}
    </div>
    <div class="col-lg-4">
        {#if item}
            <div
                class="card mt-3 text-white sticky-top"
                in:fly={{ opacity: 0, x: 50, duration: 300 }}
            >
                <div
                    class="card-header d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                    style="background-image: url('{item.cover}')"
                >
                    <div class="d-flex flex-row card-user-info">
                        <a class="text-white" use:link href="/{item.user}">
                            <img
                                src={item.avatar
                                    ? item.avatar
                                    : "http://localhost/onics/style/default.png"}
                                alt="Avatar de {item.user}"
                                class="avatar rounded-circle mr-2"
                                on:error={function () {
                                    this.src =
                                        "http://localhost/onics/style/default.png";
                                }}
                            />
                        </a>
                        <div class="d-flex flex-column">
                            <span class="user-info">
                                <a
                                    class="text-white"
                                    use:link
                                    href="/{item.user}"
                                >
                                    <b>{item.user}</b>
                                </a></span
                            >
                            <small>
                                <b>{item.rank_info.fullname}</b>
                                <span class="name">({item.rank} karma) </span>
                            </small>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        {item.quote}
                    </p>
                </div>
            </div>
        {/if}
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
</style>
