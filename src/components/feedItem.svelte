<script>
    import Gicon from "./gicon.svelte";
    import ReactionsBox from "./reactionsBox.svelte";
    import { link } from "svelte-navigator";
    export let item = { text: "hello test" };

    let reactionsBoxOpen = false;

    let streaming_attachment_obj = {};

    $: {
        if (item) {
            if (item.attachment_type == 4) {
                streaming_attachment_obj = JSON.parse(item.attachment);
            }
        }
    }
</script>

<div class="card my-2">
    <div class="card-header d-flex">
        <img
            src={item.avatar
                ? item.avatar
                : "http://localhost/onics/style/default.png"}
            alt="Avatar de {item.user}"
            class="avatar rounded-circle mr-2"
            on:error={function () {
                this.src = "http://localhost/onics/style/default.png";
            }}
        />
        {#if item.reshoutby}
            <img
                src={item.reshoutavatar}
                alt="Avatar de {item.reshoutby}"
                class="avatar rounded-circle mr-2 parent-shout-user-avatar"
                on:error={function () {
                    this.src = "http://localhost/onics/style/default.png";
                }}
            />
        {/if}
        <div class="d-flex flex-column">
            <span class="user-info"
                ><a use:link href="/@{item.user}">{item.user}</a>
                {#if item.reshoutby}
                    <small>
                        compartió de <a use:link href="/@{item.reshoutby}"
                            >{item.reshoutby}</a
                        ></small
                    >
                {/if}</span
            >
            <small class="date"
                ><a use:link href="/shout/{item.id}">{item.elapsed}</a></small
            >
        </div>
    </div>
    <div class="card-body">
        <p class="card-text">{@html item.text}</p>
        {#if item.attachment_type != "0"}
            {#if item.attachment_type == 1}
                <!-- imagen -->
                <p>
                    <img
                        src={item.attachment}
                        alt=" Imagen de publicada por {item.user}"
                        class="shout-image"
                    />
                </p>
            {/if}

            {#if item.attachment_type == 4}
                <!-- streaming service -->
                {#if streaming_attachment_obj.provider == "www.youtube.com"}
                    <iframe
                        title="-"
                        src="//www.youtube.com/embed/{streaming_attachment_obj.id}"
                        class="video {streaming_attachment_obj.id}"
                        width="520"
                        height="390"
                        frameborder="0"
                        allowfullscreen=""
                    />
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
        <Gicon
            title="Reacciones"
            icon="add_reaction"
            class="cursor-pointer text-muted"
            on:click={() => (reactionsBoxOpen = !reactionsBoxOpen)}
        />
    </div>
    {#if reactionsBoxOpen}
        <ReactionsBox />
    {/if}
</div>

<style>
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
    iframe.video {
        width: 100%;
        min-height: 50vh;
    }

    .parent-shout-user-avatar {
        position: absolute;
        width: 35px;
        height: 35px;
        top: 30px;
        left: 40px;
    }

    @media (max-width: 1000px) {
        iframe.video {
            min-height: 25vh;
            max-height: 25vh;
        }
    }
</style>
