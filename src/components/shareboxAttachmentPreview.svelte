<script>
    import Gicon from "./gicon.svelte";
    import YoutubeComponent from "./youtubeComponent.svelte";

    export let attachment = {
        raw: "",
        provider: "potato",
        id: null,
        type: 1,
    };

    export let error = false;
    export let prev_visible = false;
</script>

{#if prev_visible}
    <div class="border rounded p-1">
        {#if attachment.type == 1 && attachment.raw.length > 1}
            <div class="text-right mb-1">
                <span
                    class="btn btn-outline-danger btn-sm"
                    on:click={() => (prev_visible = false)}
                >
                    <Gicon icon="delete" />
                </span>
            </div>
            <img
                src={attachment.raw}
                class="img-fluid"
                alt="Adjunto de shout"
            />
        {:else if attachment.type == 3}
            <div class="text-right mb-1">
                <span
                    class="btn btn-outline-danger btn-sm"
                    on:click={() => (prev_visible = false)}
                >
                    <Gicon icon="delete" />
                </span>
            </div>
            <video src={attachment.raw} class="video" />
        {:else if attachment.type == 4 && attachment.provider == "youtube"}
            <div class="text-right mb-1">
                <span class="btn btn-outline-danger btn-sm">
                    <Gicon icon="delete" />
                </span>
            </div>
            <YoutubeComponent video_info={attachment} />
        {:else if error}
            <div class="text-right mb-1">
                <span
                    class="btn btn-outline-danger btn-sm"
                    on:click={() => (prev_visible = false)}
                >
                    <Gicon icon="close" />
                </span>
            </div>
            <span>{error}</span>
        {/if}
    </div>
{/if}
