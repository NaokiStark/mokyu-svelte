<script>
    import { Body } from "svelte-body";
    import { link } from "svelte-navigator";
    import { fly, fade } from "svelte/transition";
    import { api_request, backendRoot } from "../api.js";
    import Gicon from "../components/gicon.svelte";
    import { getElapsed } from "../utils.js";
    import SvelteMarkdown from "svelte-markdown";
    import { each } from "svelte/internal";
    import { twiemoji as twemoji } from "../utils/twemoji.js";

    export let site_config;
    export let item;
    export let post_id = 0;

    let last_posts = null;

    $: get_post(post_id).then((x) => {
        item = x;
    });

    $: get_lasts_posts(item).then((x) => {
        last_posts = x;
    });

    function get_post(sid) {
        return api_request(`community/posts/${sid}`);
    }

    function get_lasts_posts(i) {
        if (i == null) return Promise.reject();

        return api_request(
            `community/posts?community=${i.community.id}&page=0&limit=6`
        );
    }
</script>

{#if item}
    {#if item.community.background}
        <Body
            style=" background: url('{item.community
                .background}') no-repeat fixed;background-size: cover;background-position: center;"
        />
    {/if}
{/if}
<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1 col-xl-2" />
    {#if item}
        <div class="col-lg-5 col-xl-5 mt-3 mx-0 px-0">
            <!-- Header de la comunidad -->
            <div class="card comm-header">
                <div class="card text-white">
                    <div
                        class="card-header d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                        style="background-image: url('{item.community.cover}')"
                    >
                        <div
                            class="d-flex flex-row card-user-info align-items-center"
                        >
                            <a
                                class="text-white"
                                use:link
                                href="/{item.community.name}"
                            >
                                <img
                                    src={item.community.avatar
                                        ? item.community.avatar
                                        : `${backendRoot}style/default.png`}
                                    alt="Avatar de {item.community.name}"
                                    class="avatar rounded-circle mr-2"
                                    on:error={function () {
                                        this.src = `${backendRoot}style/default.png`;
                                    }}
                                />
                            </a>
                            <div class="d-flex flex-column">
                                <span class="user-info">
                                    <a
                                        class="text-white"
                                        use:link
                                        href="/comunidad/{item.community.id}"
                                    >
                                        <h4><b>{item.community.name}</b></h4>
                                    </a></span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {item.community.description}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Contenido del post-->
            <div class="card mt-2">
                <!-- Encabezado del post-->
                <div class="card-header">
                    <h3><b>{item.title}</b></h3>
                    <span
                        >Creado por {item.user.username}
                        {getElapsed(item.created)}</span
                    >
                    <span class="badge badge-primary">
                        {item.community.category.icon}
                        {item.community.category.name}
                    </span>
                </div>

                <!-- body del post-->
                <div class="card-body post-body">
                    <SvelteMarkdown source={item.body} />
                </div>

                <!-- footer del post-->

                <div class="card-footer">
                    <span class="d-flex flex-row justify-content-between">
                        <h4 class="d-flex flex-row align-items-center">
                            <Gicon icon="workspace_premium" class="mr-1" />
                            <b class="mr-1">{item.points}</b>
                            <span class="mr-1">Valoraciones</span>
                        </h4>
                        <span>
                            <button type="button" class="btn btn-primary"
                                ><Gicon icon="exposure_plus_1" /> Valorar</button
                            >
                        </span>
                    </span>
                </div>
            </div>
        </div>
    {/if}
    <div class="col-lg-3 col-xl-3">
        <div class=" sticky-top">
            {#if item}
                <div
                    class="card mt-3 text-white"
                    in:fly={{ opacity: 0, x: 50, duration: 300 }}
                >
                    <div
                        class="card-header d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                        style="background-image: url('{item.user.cover}')"
                    >
                        <div class="d-flex flex-row card-user-info">
                            <a
                                class="text-white"
                                use:link
                                href="/{item.user.username}"
                            >
                                <img
                                    src={item.user.avatar
                                        ? item.user.avatar
                                        : `${backendRoot}style/default.png`}
                                    alt="Avatar de {item.user}"
                                    class="avatar rounded-circle mr-2"
                                    on:error={function () {
                                        this.src = `${backendRoot}style/default.png`;
                                    }}
                                />
                            </a>
                            <div class="d-flex flex-column">
                                <span class="user-info">
                                    <a
                                        class="text-white"
                                        use:link
                                        href="/{item.user.username}"
                                    >
                                        <b>{item.user.username}</b>
                                    </a></span
                                >
                                <small>
                                    <b>{item.user.rankName}</b>
                                    <span class="name"
                                        >({item.user.rank} karma)
                                    </span>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <p class="card-text">
                            {item.user.quote}
                        </p>
                    </div>
                </div>

                <div
                    class="card mt-2 text-white"
                    in:fly={{ opacity: 0, x: 50, duration: 300 }}
                >
                    <div class="card-header">
                        <Gicon icon="campaign" /> Últimos temas de la comunidad
                    </div>
                    <div class="card-body">
                        <ul class="last-posts">
                            {#if last_posts}
                                {#each last_posts as last_post}
                                    <li class="d-flex" use:twemoji>
                                        <a
                                            use:link
                                            href="/tema/{last_post.id}"
                                            class="link-primary"
                                        >
                                            <span
                                                title={last_post.community
                                                    .category.name}
                                            >
                                                {last_post.community.category
                                                    .icon}
                                            </span>
                                            <span
                                                class="post-title ml-1"
                                                title={last_post.title}
                                            >
                                                {last_post.title}
                                            </span>
                                        </a>
                                    </li>
                                {/each}
                            {/if}
                        </ul>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
    .card-header-with-cover {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 16vh;
        padding: 0;
        margin: 0;
    }
    .card-user-info {
        width: 100%;
        margin: 0;
        padding: 0.75rem 1.25rem;
        background: rgb(2, 0, 36);
        background: linear-gradient(
            0deg,
            #212529 40%,
            rgba(255, 255, 255, 0) 100%
        );
        margin-bottom: -1px;
    }
    .last-posts {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    :global(.post-body img) {
        max-width: 100%;
    }
</style>
