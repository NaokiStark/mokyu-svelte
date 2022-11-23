<script>
    import FeedItem from "./feedItem.svelte";
    import FeedItemPlaceholder from "./feedItemPlaceholder.svelte";
    import ShareBox from "./shareBox.svelte";
    import { fly, fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import Masonry from "svelte-masonry/Masonry.svelte";

    export let site_config;
    let refreshLayout = () => true;
    export let feedList = { info: { page: 0 }, data: [] };

    //$: feedList.data, refreshLayout();

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
        <ShareBox bind:site_config bind:feedList />
    {/if}
    {#if !options.show_3x3}
        <div class="row">
            {#if feedList.data}
                {#each feedList.data.slice(0, options.items_per_page) as item (item)}
                    <div
                        in:fly={{ opacity: 0, y: -50, duration: 300 }}
                        animate:flip={{ delay: 0, duration: 300 }}
                    >
                        <FeedItem {item} bind:site_config {options} />
                    </div>
                {/each}
            {:else}
                {#each dumb as dummy}
                    <FeedItemPlaceholder />
                {/each}
            {/if}
        </div>
    {:else}
        <Masonry bind:refreshLayout items={feedList.data}>
            {#if feedList.data}
                {#each feedList.data.slice(0, options.items_per_page) as item (item)}
                    <div
                        in:fly={{ opacity: 0, y: -50, duration: 300 }}
                        animate:flip={{ delay: 0, duration: 300 }}
                        on:animationend={refreshLayout}
                    >
                        <FeedItem {item} bind:site_config {options} />
                    </div>
                {/each}
            {:else}
                {#each dumb as dummy}
                    <FeedItemPlaceholder />
                {/each}
            {/if}
        </Masonry>
    {/if}
</div>
