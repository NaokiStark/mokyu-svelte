<script>
    import FeedItem from "./feedItem.svelte";
    import FeedItemPlaceholder from "./feedItemPlaceholder.svelte";
    import ShareBox from "./shareBox.svelte";
    import { fly, fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import Masonry from "svelte-masonry/Masonry.svelte";
    import ShoutView from "./shoutView.svelte";

    export let site_config;
    let refreshLayout = () => true;
    export let feedList = { info: { page: 0 }, data: [] };

    export let user_data;

    //$: feedList.data, refreshLayout();

    export let options = {
        infinite_scroll: true,
        items_per_page: 2000,
        sharebox: true,
        show_3x3: false,
    };
    let dumb = [1, 1, 1, 1];

    let from_list = true;
    let preview_modal_visible = false;
    let item_selected_id = 0;
    let show_shout_unit_modal = (id) => {
        item_selected_id = id;
        // preview_modal_visible = true;
    };
</script>

<div class="feed-container">
    {#if options.sharebox}
        <ShareBox bind:site_config bind:feedList bind:user_data />
    {/if}
    {#if !options.show_3x3}
        <div class="">
            {#if feedList.data}
                {#each feedList.data.slice(0, options.items_per_page) as item (item)}
                    <div
                        in:fly={{ opacity: 0, y: -50, duration: 300 }}
                        animate:flip={{ delay: 0, duration: 300 }}
                        class="p-0"
                    >
                        <FeedItem
                            {item}
                            bind:site_config
                            {options}
                            {from_list}
                            {show_shout_unit_modal}
                        />
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
                    <div>
                        <FeedItem
                            {item}
                            bind:site_config
                            {options}
                            {from_list}
                            {show_shout_unit_modal}
                        />
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
