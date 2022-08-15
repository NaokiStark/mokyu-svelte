<script>
    import { twiemoji as twemoji } from "../utils/twemoji.js";
    export let options = {};
    export let reaction_list;
</script>

<div class="reactions-box position-absolute">
    <div class="card">
        <div class="card-body d-flex emoji-list">
            {#if reaction_list}
                {#each reaction_list as reaction}
                    <span
                        class="cursor-pointer mx-1"
                        title={reaction.reaction_text}
                        use:twemoji
                    >
                        {reaction.reaction_emoji}
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
