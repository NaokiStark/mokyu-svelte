<script>
    import Gicon from "./gicon.svelte";
    import ReactionsBox from "./reactionsBox.svelte";
    import { link } from "svelte-navigator";
    import { twiemoji as twemoji } from "../utils/twemoji.js";
    import YoutubeComponent from "./youtubeComponent.svelte";
    import { fly, fade } from "svelte/transition";
    import { backendRoot } from "../api.js";

    export let item = { text: "hello test" };
    export let site_config;
    export let options = {
        show_3x3: false,
    };

    let reactionsBoxOpen = false;

    let streaming_attachment_obj = {};

    $: {
        if (item) {
            if (item.attachment_type == 4) {
                streaming_attachment_obj = JSON.parse(item.attachment);
            }
        }
    }

    let reaction_test = [{ "❤️": 10 }];

    let reactions_box_enabled = false;

    let delay = 0;
</script>

<div class="card my-2">
    <div class="card-header d-flex">
        <img
            src={item.avatar ? item.avatar : `bkndroot_style/default.png`}
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
                        compartió de <a use:link href="/{item.reshoutby}"
                            >{item.reshoutby}</a
                        ></small
                    >
                {/if}</span
            >
            <small class="date">
                <a use:link href="/shout/{item.id}">{item.elapsed}</a>
            </small>
        </div>
    </div>
    <div class="card-body">
        <p class="card-text" use:twemoji>{@html item.text}</p>
        {#if item.attachment_type != "0"}
            {#if item.attachment_type == 1}
                <!-- imagen -->
                <p>
                    <a use:link href="/shout/{item.id}">
                        <img
                            src={item.attachment}
                            alt=" Imagen de publicada por {item.user}"
                            class="shout-image"
                        />
                    </a>
                </p>
            {/if}

            {#if item.attachment_type == 4}
                <!-- streaming service -->
                {#if streaming_attachment_obj.provider == "www.youtube.com"}
                    <YoutubeComponent video_info={streaming_attachment_obj} />
                {/if}
            {/if}
        {/if}
    </div>
    <div class="card-footer d-flex justify-content-between ">
        {#if item.comments_count}
            <a use:link href="/shout/{item.id}">
                <Gicon
                    title="Comentarios"
                    icon="forum"
                    class="cursor-pointer text-muted"
                />
                {item.comments_count}
            </a>
        {:else}
            <span />
        {/if}
        <div class="d-flex justify-content-between ">
            <div class="users-reactions d-flex flex-row">
                {#each reaction_test as reactn}
                    {#if reactn[Object.keys(reactn)[0]] > 0}
                        <span use:twemoji>
                            <span class="reaction-count-emoji">
                                {Object.keys(reactn)[0]}
                            </span>
                            <span class="badge badge-primary reaction-count">
                                {reactn[Object.keys(reactn)[0]]}
                            </span>
                        </span>
                    {/if}
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
        <ReactionsBox bind:reaction_list={site_config.reactions} />
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
