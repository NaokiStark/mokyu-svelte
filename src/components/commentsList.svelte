<script>
    import CommentItem from "./commentItem.svelte";
    import FeedItemPlaceholder from "./feedItemPlaceholder.svelte";
    import Gicon from "./gicon.svelte";
    import ShareBox from "./shareBox.svelte";
    export let site_config;
    export let user_data;

    export let feedList = { info: { page: 0 }, data: [] };
    export let options = {
        infinite_scroll: true,
        items_per_page: 20,
        sharebox: true,
    };
    let dumb = [1, 1, 1, 1];
</script>

<div class="feed-container">
    {#if options.sharebox}
        <ShareBox bind:user_data />
    {/if}
    <div class="card comment-count-box">
        <div class="card-body">
            <h4>
                <Gicon icon="forum" />
                {feedList.data.length} Comentario{#if feedList.data.length != 1}s{/if}
            </h4>
        </div>
    </div>
    {#if feedList.data}
        {#each feedList.data as item}
            <CommentItem {item} bind:site_config />
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
