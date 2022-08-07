<script>
    import FeedItem from "./feedItem.svelte";
    import FeedItemPlaceholder from "./feedItemPlaceholder.svelte";
    import ShareBox from "./shareBox.svelte";

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
        <ShareBox />
    {/if}
    {#if feedList.data}
        {#each feedList.data as item}
            <FeedItem {item} />
        {/each}
    {:else}
        {#each dumb as dummy}
            <FeedItemPlaceholder />
        {/each}
    {/if}
</div>
