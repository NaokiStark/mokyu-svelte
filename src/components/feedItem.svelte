<script>
    import Gicon from "./gicon.svelte";
    import ReactionsBox from "./reactionsBox.svelte";
    import { link } from "svelte-navigator";
    import { twiemoji as twemoji } from "../utils/twemoji.js";
    import YoutubeComponent from "./youtubeComponent.svelte";
    import { fly, fade } from "svelte/transition";
    import { backendRoot } from "../api.js";
    import { getElapsed } from "../utils";
    import { onMount } from "svelte";

    export let item;
    export let site_config;
    export let options = {
        show_3x3: false,
    };
    export let from_list = false;

    export let show_shout_unit_modal = (x) => 1;

    let reactionsBoxOpen = false;

    let streaming_attachment_obj = {};

    let reactionsCount = {};

    onMount(() => {
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
    });

    $: {
        if (item) {
            if (item.attachmentType == 4) {
                streaming_attachment_obj = JSON.parse(item.attachment);
            }
        }
    }

    let reaction_test = [{ "❤️": 10 }];

    let reactions_box_enabled = true;

    let delay = 0;

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

    function refreshEmojis() {
        if (item) {
            reactionsCount = {};
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
</script>

<div class="card my-2">
    <div class="card-header d-flex">
        <img
            src={item.user.avatar
                ? item.user.avatar
                : `bkndroot_style/default.png`}
            alt="Avatar de {item.username}"
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
                <a use:link class="link-primary" href="/{item.user.username}"
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

        {#if item.attachmentType != 0}
            {#if item.attachmentType == 1}
                <!-- imagen -->
                <p>
                    {#if !from_list}
                        <a use:link href="/shout/{item.id}">
                            <img
                                src={item.attachment}
                                alt=" Imagen de publicada por {item.user
                                    .username}"
                                class="shout-image"
                            />
                        </a>
                    {:else}
                        <a
                            href="/shout/{item.id}"
                            on:click={(e) => {
                                /*e.preventDefault();
                                show_shout_unit_modal(item.id);*/
                            }}
                        >
                            <img
                                src={item.attachment}
                                alt=" Imagen de publicada por {item.user
                                    .username}"
                                class="shout-image"
                            />
                        </a>
                    {/if}
                </p>
            {/if}

            {#if item.attachmentType == 4}
                <!-- streaming service -->
                {#if streaming_attachment_obj.provider == "www.youtube.com"}
                    <YoutubeComponent video_info={streaming_attachment_obj} />
                {/if}
            {/if}
        {/if}
    </div>
    <div class="card-footer d-flex justify-content-between">
        {#if item.comments.length}
            <a use:link href="/shout/{item.id}">
                <Gicon
                    title="Comentarios"
                    icon="forum"
                    class="cursor-pointer text-muted"
                />
                {item.comments.length}
            </a>
        {:else}
            <a use:link href="/shout/{item.id}">
                <Gicon
                    title="Comentarios"
                    icon="forum"
                    class="cursor-pointer text-muted"
                />
                0
            </a>
        {/if}
        <div class="d-flex justify-content-between">
            <div class="users-reactions d-flex flex-row">
                {#each Object.entries(reactionsCount) as [emoji, count]}
                    <span
                        use:twemoji
                        on:click={() => console.log(getReactionsByEmoji(emoji))}
                    >
                        <span class="reaction-count-emoji">
                            {emoji}
                        </span>
                        <span class="badge badge-primary reaction-count">
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
                    on:click={() => (reactionsBoxOpen = !reactionsBoxOpen)}
                />
            {/if}
        </div>
    </div>

    {#if reactionsBoxOpen && site_config}
        <ReactionsBox
            bind:reaction_list={site_config.reactions}
            on:selected={() => {
                reactionsBoxOpen = !reactionsBoxOpen;
                refreshEmojis();
            }}
            bind:feed={item}
        />
    {/if}
</div>

<style>
    .card-footer {
        user-select: none;
    }

    .avatar {
        width: 50px;
        height: 50px;
    }
    .date {
        font-style: italic;
        text-transform: capitalize;
    }

    .shout-image {
        max-width: 100%;
        max-height: 75vh; /* I thing 75vh is ok?, works ok in desktop and mobile*/
        border-radius: 3px;
    }

    .parent-shout-user-avatar {
        position: absolute;
        width: 35px;
        height: 35px;
        top: 30px;
        left: 40px;
    }
    .reaction-count-emoji {
        font-size: 1.2em;
        cursor: pointer;
    }
    .reaction-count {
        position: relative;
        top: 11px;
        left: -9px;
        font-size: 0.7em;
        background-color: #504f4f !important;
        border-radius: 50px;
        cursor: pointer;
    }

    @media (max-width: 1000px) {
        iframe.video {
            min-height: 25vh;
            max-height: 25vh;
        }
    }
</style>
