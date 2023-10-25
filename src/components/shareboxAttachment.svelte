<script>
    import Gicon from "./gicon.svelte";
    import ShareboxAttachmentPreview from "./shareboxAttachmentPreview.svelte";
    import { fly, fade } from "svelte/transition";

    export let attachment;

    let video_input_visible = false;

    let attachment_buttons_visibles = true;

    function getImageAttachment() {}

    function getVideoAttachment() {
        let attachment_check = {
            //Raw:
        };
    }

    function toggle_ext_vid() {
        attachment_buttons_visibles = !attachment_buttons_visibles;
        video_input_visible = !video_input_visible;
    }
</script>

<div class="sharebox-attachments d-flex flex-column mt-2">
    {#if attachment_buttons_visibles}
        <div
            class="d-flex flex-row"
            in:fly={{ opacity: 0, y: -10, duration: 300 }}
        >
            <button
                type="button"
                class="btn btn-outline-primary mx-1"
                title="Imagen"
            >
                <Gicon icon="image" />
            </button>
            <button
                type="button"
                class="btn btn-outline-primary mx-1"
                title="Video"
                on:click={toggle_ext_vid}
            >
                <Gicon icon="movie" />
            </button>
            <!--
        <button
            type="button"
            class="btn btn-outline-primary mx-1"
            title="Enlace"
        >
            <Gicon icon="link" />
        </button>-->
        </div>
    {/if}

    <!-- Video Input -->
    {#if video_input_visible}
        <div
            class="ext-video-attch-field border rounded p-2 mt-2 d-flex flex-column"
            in:fly={{ opacity: 0, y: -10, duration: 300 }}
        >
            <div
                class="mb-1 d-flex flex-row align-content-center justify-content-between"
            >
                <span class="d-flex flex-wrap align-content-center">
                    <Gicon icon="smart_display" />
                    <span class="ml-1">Insertar video</span>
                </span>
                <div class="text-right">
                    <span
                        class="btn btn-outline-danger btn-sm"
                        title="Cancelar"
                        on:click={toggle_ext_vid}
                    >
                        <Gicon icon="highlight_off" />
                    </span>
                </div>
            </div>
            <div class="d-flex flex-row">
                <input
                    type="text"
                    name="ext-vid"
                    id="ext-vid"
                    class="form-control"
                    placeholder="Url del video de YouTube"
                />
                <button type="button" class="btn btn-primary ml-1"
                    >Agregar</button
                >
            </div>
        </div>
    {/if}

    <div class="sharebox-attachment-result mt-2">
        <ShareboxAttachmentPreview {attachment} />
    </div>
</div>

<style>
    .sharebox-attachments {
        margin-left: 55px;
    }
</style>
