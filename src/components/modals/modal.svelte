<script>
    export let modal_style = "center";

    import { key } from "./modal-fn.js";
    import { setContext } from "svelte";
    import { fly, fade } from "svelte/transition";

    export let visible = true;

    let toggle_visible = function () {
        visible = !visible;
    };

    setContext(key, {
        toggleModal: toggle_visible,
    });
</script>

{#if visible}
    <div
        class="modal-background modal-{modal_style}"
        transition:fade={{ duration: 200 }}
    >
        <div
            class="modal-window card"
            in:fly={{ duration: 300, y: -50 }}
            out:fly={{ duration: 300, y: 50 }}
        >
            <slot />
        </div>
    </div>
{/if}

<style>
    .modal-background {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 9999;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .modal-window {
        min-width: 30vw;
        min-height: 2vw;
        max-height: 100%;
        overflow-y: auto;

        border-radius: 5px;
    }

    .modal-center {
    }

    .modal-top {
        align-content: flex-start;
        padding-top: 10vh;
    }

    :global(.modal-header) {
        min-height: 1em;
        border-bottom: solid 1px #f1f1f1;
        padding: 1em;
    }
    :global(.modal-body) {
        padding: 1em;
    }
    :global(.modal-header h1, .modal-header h2, .modal-header h3, .modal-header
            h4, .modal-header h5, .modal-header h6) {
        padding: 0;
        margin: 0;
    }
    :global(.modal-footer) {
        border-top: solid 1px #f1f1f1;
        padding: 0.5em;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
</style>
