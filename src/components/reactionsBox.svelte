<script>
    import { twiemoji as twemoji } from "../utils/twemoji.js";
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { api_request } from "../api.js";
    import ErrorModal from "./modals/errorModal.svelte";

    const dispatch = createEventDispatcher();

    export let options = {};
    export let reaction_list;
    export let feed;

    let modalError = false;
    let errorMessage = JSON.stringify({ message: "not errors today c:" });

    function sendReaction(reationid) {
        if (!JSON.parse(localStorage.userData ?? "null")) {
            errorMessage = JSON.stringify({
                message:
                    '<a href="/login">Ingresa</a> para poder reaccionar el shout</a>',
            });
            modalError = true;
            return;
        }
        api_request("reaction", "post", {
            feedId: feed.id,
            reactionId: reationid,
        })
            .then((x) => {
                if (typeof x == "object") {
                    feed.lovesList = [
                        ...feed.lovesList,
                        {
                            user: JSON.parse(localStorage.userData),
                            reaction: x,
                        },
                    ];
                    dispatch("selected");
                } else {
                    errorMessage = x;
                    modalError = true;
                }
            })
            .catch((r) => {
                errorMessage = r;
                modalError = true;
                dispatch("selected");
            });
    }
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
                        on:click={() => sendReaction(reaction.id)}
                        use:twemoji
                    >
                        {reaction.reactionEmoji}
                    </span>
                {/each}
            {/if}
        </div>
    </div>
</div>
<ErrorModal bind:visible={modalError}>
    {@html JSON.parse(
        typeof errorMessage == "object"
            ? JSON.stringify(errorMessage)
            : errorMessage
    ).message?.replace("\n", "<br>")}
</ErrorModal>

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
