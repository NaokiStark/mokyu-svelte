<script>
    import { twiemoji as twemoji } from "../utils/twemoji.js";
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let options = {};
    export let reaction_list;
</script>

<div
    class="reactions-box position-absolute"
    transition:fly={{ opacity: 0, y: 50, duration: 200 }}
>
    <div class="card">
        <div class="card-body d-flex emoji-list">
            {#if reaction_list}
                {#each reaction_list as reaction}
                    <span
                        class="cursor-pointer mx-1"
                        title={reaction.reactionText}
                        on:click={() => dispatch("selected")}
                        use:twemoji
                    >
                        {reaction.reactionEmoji}
                    </span>
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    .reactions-box {
        bottom: -3em;
        right: 3em;
        z-index: 22;
    }
    .emoji-list {
        font-size: 2em;
    }
    :global(.emoji) {
        width: 1.2em;
        padding: 0em 1px;
    }
</style>
