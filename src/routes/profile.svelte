<script>
    import { fly, fade } from "svelte/transition";
    import { api_request, backendRoot } from "../api.js";
    import Gicon from "../components/gicon.svelte";
    import FeedList from "../components/feedList.svelte";
    import { twiemoji as twemoji } from "../utils/twemoji.js";
    import InfiniteLoading from "svelte-infinite-loading";
    import { getElapsed } from "../utils";
    import { onMount } from "svelte";

    import { Body } from "svelte-body"; // weird
    import { each } from "svelte/internal";

    export let site_config;
    export let username;
    export let user_data;

    let item = null;
    let user_stats = null;

    let loadedbefore = false;

    $: get_user(username).then((x) => {
        item = x[0];

        //refreshInfinite();
    });

    $: get_stats(item).then((x) => {
        user_stats = x;
        //refreshInfinite();
        //infiniteId = Symbol();
    });

    function get_user(sid) {
        return api_request(`Users/name?username=${sid}`);
    }

    function get_stats(sid) {
        if (!sid) {
            return Promise.reject();
        }
        return api_request(`Users/userStats/${sid.id}`);
    }

    let feedList = {
        info: { page: 0 },
        data: [],
    };

    let feedListOptions = {
        infinite_scroll: true,
        items_per_page: 2000,
        sharebox: false,
        show_3x3: false,
    };

    let page = 0;
    /*
    $: get_user_feed(item).then((x) => {
        feedList.data = x.data;
    });

    function get_user_feed(sid) {
        if (!sid) {
            return Promise.reject();
        }
        return api_request(`feed_profile/${sid.id}`);
    }*/
    let infiniteId = Symbol();
    function refreshInfinite() {
        page = 0;
        feedList.data = [];
        infiniteId = Symbol();
    }

    function infiniteHandler({ detail: { loaded, complete } }) {
        api_request(`Feed/userid?id=${item.id}&limit=10&page=${page}`).then(
            (x) => {
                if (x.length > 0) {
                    feedList.data = [...feedList.data, ...x];
                    page += 1;
                    feedList.info.page = page;
                    loaded();
                } else {
                    complete();
                }
            }
        );
    }
</script>

{#if item}
    {#if item.background}
        <Body
            style="background: url('{item.background}') no-repeat fixed;background-size: cover;background-position: center;"
        />
    {/if}
{/if}
<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-lg-1 col-xl-2" />
    <div class="col-lg-5 col-xl-5 mt-2 mx-0 px-0">
        {#if item}
            <div class="card mt2">
                <div
                    class="d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                    style="background: linear-gradient( 0deg, #212529 0%, rgba(255, 255, 255, 0) 37% ), url('{item.cover}') no-repeat; background-size:cover; background-position: center;"
                >
                    <div
                        class="d-flex flex-column flex-lg-row card-user-info flex-wrap align-content-center align-content-lg-start justify-content-center justify-content-lg-start align-items-center align-items-lg-center"
                    >
                        <img
                            src={item.avatar
                                ? item.avatar
                                : `${backendRoot}style/default.png`}
                            alt="Avatar de {item.username}"
                            class="avatar main-avatar rounded-circle mr-2"
                            on:error={function () {
                                this.src = `${backendRoot}style/default.png`;
                            }}
                        />
                        <div
                            class="mt-lg-0 mt-2 d-flex flex-column text-white user-head-data align-items-center align-items-lg-start p-0 pl-md-2"
                        >
                            <h3 class="user-info">
                                <b>
                                    {item.username}
                                    {#if item.donation_heart}
                                        <small
                                            class="d-inline-flex cursor-pointer"
                                            title="Ha donado, gracias!"
                                        >
                                            <Gicon
                                                icon="favorite"
                                                class="donator-badge"
                                                title="Ha donado, gracias!"
                                            />
                                        </small>
                                    {/if}
                                    {#if item.name.length > 0}
                                        <small>({item.name}) </small>
                                    {/if}
                                </b>
                            </h3>
                            <span>
                                <!-- follow badge -->
                                <span class="badge badge-primary">Te sigue</span
                                >
                                <!-- rank -->
                                <b>{item.rankName}</b>
                                <small class="name">({item.rank} karma) </small>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-body user-bio-more">
                    <div class="d-flex flex-column">
                        <div
                            class="quote mb-3 d-flex flex-row justify-content-center justify-content-lg-start"
                        >
                            <span>{item.quote}</span>
                        </div>
                        <div
                            class="d-flex flex-row justify-content-center justify-content-lg-end"
                        >
                            {#if item.id != (user_data ?? { id: 0 }).id}
                                <button
                                    type="button"
                                    class="btn btn-primary mr-1"
                                >
                                    <Gicon icon="person_add" />
                                    Seguir
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-danger mr-1 text-white"
                                >
                                    <Gicon icon="block" /> Bloquear
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    title="Denunciar"
                                >
                                    <Gicon icon="flag" />
                                </button>
                            {:else}
                                <button
                                    type="button"
                                    class="btn btn-primary mr-1"
                                >
                                    <Gicon icon="edit" />
                                    Editar perfil
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
            <!-- feedList -->
            <div class="infinite-wrapper">
                {#if user_stats}
                    <FeedList
                        {feedList}
                        bind:site_config
                        options={feedListOptions}
                    />
                    <InfiniteLoading
                        spinner="wavedots"
                        on:infinite={infiniteHandler}
                        identifier={infiniteId}
                    />
                {/if}
            </div>
        {/if}
    </div>
    <div class="col-lg-3 col-xxl-3">
        <div class="sticky-top">
            <div class="card mt-2">
                <div class="card-header">
                    <Gicon icon="info" /> Información
                </div>

                <div class="card-body">
                    {#if user_stats}
                        <div
                            class="follow-stats d-flex flex-column cursor-default"
                        >
                            <div class="d-flex flex-row justify-content-evenly">
                                <span>
                                    <Gicon icon="chevron_right" /><b
                                        >{user_stats.followers.length}</b
                                    > Seguidores
                                </span>
                                <span
                                    ><Gicon icon="chevron_left" /><b
                                        >{user_stats.follows.length}</b
                                    > Siguiendo</span
                                >
                            </div>
                            {#if item}
                                <div
                                    class="d-flex flex-row justify-content-center"
                                >
                                    <Gicon icon="calendar_month" />&nbsp;Se
                                    unió&nbsp;
                                    <b title={item.created}
                                        >{getElapsed(item.created)}</b
                                    >
                                </div>
                            {/if}
                        </div>
                    {:else}
                        <p class="card-text placeholder-wave">
                            <span
                                class="placeholder placeholder-wave col-6 rounded"
                            />
                            <br />
                            <span
                                class="placeholder placeholder-wave col-6 rounded"
                            />
                            <br />
                        </p>
                    {/if}
                </div>
            </div>
            {#if user_stats}
                {#if user_stats.userBadges.length > 0}
                    <div class="card mt-2">
                        <div class="card-header">
                            <Gicon icon="military_tech" /> Medallas
                        </div>
                        <div class="card-body d-flex flex-row flex-wrap">
                            {#each user_stats.userBadges as badge}
                                <div
                                    class="medal d-flex flex-column flex-wrap text-center cursor-pointer"
                                    title={badge.description}
                                >
                                    <span class="medal-icon text-center">
                                        <Gicon icon={badge.icon} />
                                    </span>
                                    <span>{badge.title}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            {/if}
            <div class="card mt-2">
                <div class="card-header">
                    <Gicon icon="feed" /> Últimos Temas
                </div>
                <div class="card-body">
                    <ul class="last-posts">
                        {#if user_stats}
                            {#if user_stats.length > 0}
                                {#each user_stats.lastposts as post}
                                    <li class="d-flex" use:twemoji>
                                        <span title={post.category_name}>
                                            {post.category_icon}
                                        </span>
                                        <span
                                            class="post-title ml-1"
                                            title={post.title}
                                        >
                                            {post.title}
                                        </span>
                                    </li>
                                {/each}
                            {:else}
                                <li class="d-flex" use:twemoji>
                                    <span title="Vacío"> 🏜️ </span>
                                    <span class="post-title text-muted ml-1">
                                        Esto está vacío y no está implementado.
                                    </span>
                                </li>
                            {/if}
                        {:else}
                            <p class="card-text placeholder-wave">
                                <li
                                    class="placeholder placeholder-wave col-6 rounded"
                                />
                                <br />
                                <li
                                    class="placeholder placeholder-wave col-6 rounded"
                                />
                                <br />
                            </p>
                        {/if}
                    </ul>
                    <div class="d-flex d-row justify-content-end">
                        <button type="button" class="btn btn-primary btn-sm">
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
    .main-avatar {
        width: 150px;
        height: 150px;
    }
    .user-bio-more {
        padding-top: 5em;
    }
    :global(.donator-badge) {
        font-size: 20px !important;
        line-height: 1.2 !important;
        color: crimson;
    }
    .card-header-with-cover {
        background-repeat: no-repeat;
        background-size: cover !important;
        background-position: center !important;
        height: 26vh;
        padding: 0;
        margin: 0;
    }
    .last-posts {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .card-user-info {
        width: 100%;
        margin: 0;
        padding: 0.75rem 1.25rem;

        margin-bottom: -1px;
        position: relative;
        top: 5em;
    }
    .user-head-data {
        justify-content: center;
        padding-left: 1em;
    }

    .cursor-default {
        cursor: default;
    }
    .medal {
        cursor: default;
        padding: 0.3em;
    }
    .medal-icon {
        background-color: #e9ecef;
        color: #212529;
        padding: 1em;
        border-radius: 50px;
        width: 56px;
        height: 56px;
        margin: 0 auto;
    }

    .post-title {
        text-overflow: ellipsis;
        max-width: 100%;
        word-break: break-all;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
