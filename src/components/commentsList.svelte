<script>
    import CommentBox from "./commentBox.svelte";
    import CommentItem from "./commentItem.svelte";
    import FeedItemPlaceholder from "./feedItemPlaceholder.svelte";
    import Gicon from "./gicon.svelte";
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";

    import ShareBox from "./shareBox.svelte";
    export let site_config;
    export let user_data;
    export let feedId = 0;
    export let feedList = [];
    export let options = {
        infinite_scroll: true,
        items_per_page: 20,
        sharebox: true,
    };
    let dumb = [1, 1, 1, 1];
    let highlight = true;

    const onload = function () {
        let hash = document.location.hash.replaceAll("#", "");
        if (hash) {
            let hashObj = document.getElementById(hash);
            if (hashObj) {
                window.scrollTo({
                    top: hashObj.getBoundingClientRect().top,
                    behavior: "smooth",
                });
            }
        }
    };

    function gethash() {
        return document.location.hash.replaceAll("#comment-", "");
    }

    $: feedList, onload();
</script>

<div class="feed-container">
    {#if options.sharebox}
        <CommentBox bind:user_data bind:feedId bind:feedList />
    {/if}
    <div class="card comment-count-box">
        <div class="card-body">
            <h4>
                <Gicon icon="forum" />
                {feedList.length} Comentario{#if feedList.length != 1}s{/if}
            </h4>
        </div>
    </div>
    {#if feedList}
        {#each feedList as item (item)}
            <div
                in:fly={{ opacity: 0, y: -50, duration: 300 }}
                animate:flip={{ delay: 0, duration: 300 }}
                class="comment-item-normal {item.id == gethash() && highlight
                    ? 'highlighted'
                    : ''}"
                on:click={() => {
                    highlight = false;
                }}
            >
                <CommentItem {item} bind:site_config />
            </div>
        {/each}
    {:else}
        {#each dumb as dummy}
            <FeedItemPlaceholder />
        {/each}
    {/if}
</div>

<style>
    .comment-count-box h4 {
        margin: 0;
    }
</style>
