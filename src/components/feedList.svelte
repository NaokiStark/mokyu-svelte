<script>
    import FeedItem from "./feedItem.svelte";
    import ShareBox from "./shareBox.svelte";

    export let feedList = { info: { page: 0 }, data: [] };
    export let options = {
        infinite_scroll: true,
        items_per_page: 20,
        sharebox: true,
    };
</script>

<div class="feed-container">
    {#if options.sharebox}
        <ShareBox />
    {/if}
    {#each feedList.data as item}
        <FeedItem {item} />
    {/each}
</div>
