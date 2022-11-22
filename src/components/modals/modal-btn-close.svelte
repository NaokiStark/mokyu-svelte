<script>
    import { getContext } from "svelte";
    import { key } from "./modal-fn.js";

    const { toggleModal } = getContext(key);
</script>

<button type="button" on:click={toggleModal} class="btn btn-primary">
    <slot />
</button>
