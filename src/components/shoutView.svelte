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
    import { getElapsed } from "../utils.js";
    import { onMount } from "svelte";

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
        item = x;
        refreshLoves();
    });

    $: {
        if (item) {
            if (item.attachmentType == 4) {
                streaming_attachment_obj = JSON.parse(item.attachment);
            }
        }
    }

    let reactionsCount = {};
    let reactions_box_enabled = false;
    let reactionsBoxOpen = false;

    let main_box;

    onMount(refreshLoves);

    function get_shout(sid) {
        if (sid == 0) {
            return Promise.reject();
        }
        item = null;

        return api_request(`Feed/?id=${sid}`);
    }

    function refreshLoves() {
        reactionsCount = {};
        if (item) {
            for (let a = 0; a < item.lovesList.length; a++) {
                let element = item.lovesList[a];
                if (!reactionsCount[element.reaction.reactionEmoji]) {
                    reactionsCount[element.reaction.reactionEmoji] = 1;
                } else {
                    reactionsCount[element.reaction.reactionEmoji] += 1;
                }
            }
        }
    }

    function getReactionsByEmoji(emoji) {
        let reactors = [];

        for (let a = 0; a < item.lovesList.length; a++) {
            let element = item.lovesList[a];
            if (element.reaction.reactionEmoji == emoji) {
                reactors = [...reactors, element.user];
            }
        }
        return reactors;
    }
</script>

{#if visible}
    <div
        class="modal-background modal-shout-preview"
        transition:fade={{ duration: 200 }}
        bind:this={main_box}
        on:click={(e) => {
            if (e.target == main_box) {
                toggle_visible();
            }
        }}
    >
        <div class="close-modal">
            <ModalBtnClose>
                <Gicon icon="close" />
            </ModalBtnClose>
        </div>
        {#if item}
            <div class="attachment-fullscreen">
                <div class="attachment-content">
                    {#if item.attachmentType != "0"}
                        {#if item.attachmentType == 1}
                            <!-- imagen -->
                            <a
                                use:link
                                href="/shout/{item.id}"
                                style="background-image: url({item.attachment});"
                                class="shout-image"
                            />
                        {/if}

                        {#if item.attachmentType == 4}
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
                        src={item.user.avatar
                            ? item.user.avatar
                            : `${backendRoot}style/default.png`}
                        alt="Avatar de {item.user.username}"
                        class="avatar rounded-circle mr-2"
                        on:error={function () {
                            this.src = `${backendRoot}style/default.png`;
                        }}
                    />
                    {#if item.parentUser}
                        <img
                            src={item.parentUser.avatar}
                            alt="Avatar de {item.parentUser.username}"
                            class="avatar rounded-circle mr-2 parent-shout-user-avatar"
                            on:error={function () {
                                this.src = `${backendRoot}style/default.png`;
                            }}
                        />
                    {/if}
                    <div class="d-flex flex-column">
                        <span class="user-info">
                            <a use:link href="/{item.user.username}"
                                >{item.user.username}</a
                            >
                            {#if item.parentUser}
                                <small>
                                    compartió de <a
                                        use:link
                                        href="/{item.parentUser.username}"
                                        >{item.parentUser.username}</a
                                    ></small
                                >
                            {/if}</span
                        >
                        <small class="date">
                            <a use:link href="/shout/{item.id}"
                                >{getElapsed(item.created)}</a
                            >
                        </small>
                    </div>
                </div>

                <div class="card-body">
                    <p class="card-text" use:twemoji>{@html item.text}</p>
                </div>

                <div class="card-footer">
                    {#if item}
                        <div class="d-flex justify-content-between ">
                            <div class="users-reactions d-flex flex-row">
                                {#each Object.entries(reactionsCount) as [emoji, count]}
                                    <span
                                        use:twemoji
                                        on:click={() =>
                                            console.log(
                                                getReactionsByEmoji(emoji)
                                            )}
                                    >
                                        <span class="reaction-count-emoji">
                                            {emoji}
                                        </span>
                                        <span
                                            class="badge badge-primary reaction-count"
                                        >
                                            {count}
                                        </span>
                                    </span>
                                {/each}
                            </div>
                            {#if reactions_box_enabled}
                                <Gicon
                                    title="Reacciones"
                                    icon="add_reaction"
                                    class="cursor-pointer text-muted"
                                    on:click={() =>
                                        (reactionsBoxOpen = !reactionsBoxOpen)}
                                />
                            {/if}
                        </div>
                    {/if}
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
        width: 100%;
        height: 100%;
        display: block;
    }
    .shout-image {
        width: 80%;
        height: 100%;
        display: block;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
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
