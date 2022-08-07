<script>
    import FeedItem from "../components/feedItem.svelte";
    import FeedItemPlaceholder from "../components/feedItemPlaceholder.svelte";
    import { fly, fade } from "svelte/transition";
    import { api_request } from "../api.js";
    import CommentsList from "../components/commentsList.svelte";

    export let shout_id = 0;

    let item = null;

    $: get_shout(shout_id).then((x) => {
        item = x.data;
    });

    function get_shout(sid) {
        return api_request(`feed/${sid}?comments`);
    }
</script>

<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1" />
    <div class="col-lg-6 mt-2 mx-0 px-0">
        {#if item}
            <FeedItem {item} />
            <CommentsList feedList={{ data: item.comments }} />
        {:else}
            <FeedItemPlaceholder />
        {/if}
    </div>
    <div class="col-lg-4">
        {#if item}
            <div
                class="card mt-3 text-white"
                in:fly={{ opacity: 0, x: 50, duration: 300 }}
            >
                <div
                    class="card-header d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                    style="background-image: url('{item.cover}')"
                >
                    <div class="d-flex flex-row card-user-info">
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
                        <div class="d-flex flex-column">
                            <span class="user-info"><b>{item.user}</b></span>
                            <small class="name">{item.rank} karma</small>
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
            rgb(2 0 36) 0%,
            rgba(255, 255, 255, 0) 100%
        );
        margin-bottom: -1px;
    }
</style>
