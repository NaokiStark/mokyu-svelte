<script>
    import { Body } from "svelte-body";
    import { link } from "svelte-navigator";
    import { fly, fade } from "svelte/transition";
    import { api_request } from "../api.js";
    import Gicon from "../components/gicon.svelte";

    export let site_config;
    export let item;
    export let post_id = 0;

    $: get_post(post_id).then((x) => {
        item = x.data;
    });

    function get_post(sid) {
        return api_request(`getPost/${sid}`);
    }
</script>

{#if item}
    {#if item.community_background}
        <Body
            style=" background: url('{item.community_background}') no-repeat fixed;background-size: cover;background-position: center;"
        />
    {/if}
{/if}
<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1" />
    {#if item}
        <div class="col-lg-6 mt-3 mx-0 px-0 mb-3">
            <!-- Header de la comunidad -->
            <div class="card comm-header">
                <div class="card text-white">
                    <div
                        class="card-header d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                        style="background-image: url('{item.community_cover}')"
                    >
                        <div
                            class="d-flex flex-row card-user-info align-items-center"
                        >
                            <a
                                class="text-white"
                                use:link
                                href="/{item.community_name}"
                            >
                                <img
                                    src={item.community_avatar
                                        ? item.community_avatar
                                        : "http://localhost/onics/style/default.png"}
                                    alt="Avatar de {item.community_name}"
                                    class="avatar rounded-circle mr-2"
                                    on:error={function () {
                                        this.src =
                                            "http://localhost/onics/style/default.png";
                                    }}
                                />
                            </a>
                            <div class="d-flex flex-column">
                                <span class="user-info">
                                    <a
                                        class="text-white"
                                        use:link
                                        href="/comunidad/{item.community_id}"
                                    >
                                        <h4><b>{item.community_name}</b></h4>
                                    </a></span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {item.community_desc}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Contenido del post-->
            <div class="card mt-2">
                <!-- Encabezado del post-->
                <div class="card-header">
                    <h3><b>{item.title}</b></h3>
                    <span>Creado por {item.user} {item.elapsed}</span>
                    <span class="badge badge-primary">
                        {item.category_icon}
                        {item.category_name}
                    </span>
                </div>

                <!-- body del post-->
                <div class="card-body post-body">
                    {@html item.body}
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
    <div class="col-lg-4  sticky-top">
        {#if item}
            <div
                class="card mt-3 text-white"
                in:fly={{ opacity: 0, x: 50, duration: 300 }}
            >
                <div
                    class="card-header d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                    style="background-image: url('{item.cover}')"
                >
                    <div class="d-flex flex-row card-user-info">
                        <a class="text-white" use:link href="/{item.user}">
                            <img
                                src={item.avatar
                                    ? item.avatar
                                    : "http://localhost/onics/style/default.png"}
                                alt="Avatar de {item.user}"
                                class="avatar rounded-circle mr-2"
                                on:error={function () {
                                    this.src =
                                        "http://localhost/onics/style/default.png";
                                }}
                            />
                        </a>
                        <div class="d-flex flex-column">
                            <span class="user-info">
                                <a
                                    class="text-white"
                                    use:link
                                    href="/{item.user}"
                                >
                                    <b>{item.user}</b>
                                </a></span
                            >
                            <small>
                                <b>{item.rank_info.fullname}</b>
                                <span class="name">({item.rank} karma) </span>
                            </small>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        {item.quote}
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
                <div class="card-body">Acá iría alto spam o no se</div>
            </div>
        {/if}
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
    :global(.post-body img) {
        max-width: 100%;
    }
</style>
