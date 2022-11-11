<script>
    import FeedItem from "./feedItem.svelte";
    import FeedItemPlaceholder from "./feedItemPlaceholder.svelte";
    import ShareBox from "./shareBox.svelte";

    export let site_config;
    export let feedList = { info: { page: 0 }, data: [] };
    export let options = {
        infinite_scroll: true,
        items_per_page: 2000,
        sharebox: true,
        show_3x3: false,
    };
    let dumb = [1, 1, 1, 1];
</script>

<div class="feed-container">
    {#if options.sharebox}
        <ShareBox bind:site_config />
    {/if}
    {#if feedList.data}
        {#each feedList.data.slice(0, options.items_per_page) as item}
            <FeedItem {item} bind:site_config {options} />
        {/each}
    {:else}
        {#each dumb as dummy}
            <FeedItemPlaceholder />
        {/each}
    {/if}
</div>
