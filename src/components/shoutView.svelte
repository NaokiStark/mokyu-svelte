<script>
    import { key } from "./modals/modal-fn.js";
    import { setContext } from "svelte";
    import { fly, fade } from "svelte/transition";

    import CommentsList from "./commentsList.svelte";
    import FeedItemPlaceholder from "./feedItemPlaceholder.svelte";
    import YoutubeComponent from "./youtubeComponent.svelte";
    import { api_request, backendRoot } from "../api.js";
    import { link } from "svelte-navigator";
    import ModalBtnClose from "./modals/modal-btn-close.svelte";
    import Gicon from "./gicon.svelte";
    import { twiemoji as twemoji } from "../utils/twemoji.js";

    export let visible = true;
    export let item;
    export let shout_id;
    export let site_config;

    let streaming_attachment_obj;

    let toggle_visible = function () {
        visible = !visible;
    };

    setContext(key, {
        toggleModal: toggle_visible,
    });

    $: get_shout(shout_id).then((x) => {
        item = x.data;
    });

    $: {
        if (item) {
            if (item.attachment_type == 4) {
                streaming_attachment_obj = JSON.parse(item.attachment);
            }
        }
    }

    function get_shout(sid) {
        return api_request(`feed/${sid}?comments`);
    }
</script>

{#if visible}
    <div
        class="modal-background modal-shout-preview"
        transition:fade={{ duration: 200 }}
    >
        <div class="close-modal">
            <ModalBtnClose>
                <Gicon icon="close" />
            </ModalBtnClose>
        </div>
        {#if item}
            <div class="attachment-fullscreen">
                <div class="attachment-content">
                    {#if item.attachment_type != "0"}
                        {#if item.attachment_type == 1}
                            <!-- imagen -->

                            <a use:link href="/shout/{item.id}">
                                <img
                                    src={item.attachment}
                                    alt=" Imagen de publicada por {item.user}"
                                    class="shout-image"
                                />
                            </a>
                        {/if}

                        {#if item.attachment_type == 4}
                            <!-- streaming service -->
                            {#if streaming_attachment_obj.provider == "www.youtube.com"}
                                <YoutubeComponent
                                    video_info={streaming_attachment_obj}
                                />
                            {/if}
                        {/if}
                    {/if}
                </div>
            </div>
        {/if}
        <div
            class="modal-window card"
            in:fly={{ duration: 300, x: -50 }}
            out:fly={{ duration: 300, x: 50 }}
        >
            {#if item}
                <div class="card-header d-flex">
                    <img
                        src={item.avatar
                            ? item.avatar
                            : `bkndroot_style/default.png`}
                        alt="Avatar de {item.user}"
                        class="avatar rounded-circle mr-2"
                        on:error={function () {
                            this.src = `${backendRoot}style/default.png`;
                        }}
                    />
                    {#if item.reshoutby}
                        <img
                            src={item.reshoutavatar}
                            alt="Avatar de {item.reshoutby}"
                            class="avatar rounded-circle mr-2 parent-shout-user-avatar"
                            on:error={function () {
                                this.src = `${backendRoot}style/default.png`;
                            }}
                        />
                    {/if}
                    <div class="d-flex flex-column">
                        <span class="user-info">
                            <a use:link href="/{item.user}">{item.user}</a>
                            {#if item.reshoutby}
                                <small>
                                    compartió de <a
                                        use:link
                                        href="/{item.reshoutby}"
                                        >{item.reshoutby}</a
                                    ></small
                                >
                            {/if}</span
                        >
                        <small class="date">
                            <a use:link href="/shout/{item.id}"
                                >{item.elapsed}</a
                            >
                        </small>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text" use:twemoji>{@html item.text}</p>
                </div>

                <CommentsList
                    feedList={{ data: item.comments }}
                    bind:site_config
                />
            {:else}
                <FeedItemPlaceholder />
            {/if}
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
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .modal-window {
        min-width: 30vw;
        min-height: 2vw;
        max-height: 100%;
        overflow-y: auto;
        max-width: 25vw;
        border-radius: 5px;
    }

    .modal-top {
        align-content: flex-start;
        padding-top: 10vh;
    }

    .avatar {
        width: 50px;
        height: 50px;
    }
    .attachment-fullscreen {
        display: flex;
        flex-direction: row;
        width: 68%;
        height: 100vh;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }
    .attachment-content {
        max-width: 100%;
        max-height: 100%;
        display: contents;
    }
    .shout-image {
        max-width: 100%;
        max-height: 100%;
    }
    .attachment-content a {
        max-height: 100%;
        width: 100%;
        display: contents;
    }

    .close-modal {
        position: fixed;
        top: 0;
        left: 0;
    }

    .parent-shout-user-avatar {
        position: absolute;
        width: 35px;
        height: 35px;
        top: 30px;
        left: 40px;
    }
</style>
