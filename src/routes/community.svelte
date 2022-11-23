<script>
    import { fly, fade } from "svelte/transition";
    import { api_request } from "../api.js";
    import Gicon from "../components/gicon.svelte";
    import FeedList from "../components/feedList.svelte";
    import { twiemoji as twemoji } from "../utils/twemoji.js";
    import InfiniteLoading from "svelte-infinite-loading";
    import PostListItem from "../components/postListItem.svelte";
    import { Body } from "svelte-body"; // weird
    import { each } from "svelte/internal";
    import { link } from "svelte-navigator";
    export let site_config;

    export let commid;

    let post_list = [];

    let item = null;

    let page = 0;

    $: get_community(commid).then((x) => {
        item = x.data;
    });

    function get_community(sid) {
        return api_request(`community/${sid}`);
    }

    let infiniteId = Symbol();
    function refreshInfinite() {
        page = 0;
        post_list = [];
        infiniteId = Symbol();
    }
    function infiniteHandler({ detail: { loaded, complete } }) {
        api_request(`communityFeed/${commid}?limit=10&page=${page}`).then(
            (x) => {
                if (x.data.length > 0) {
                    post_list = [...post_list, ...x.data];
                    page += 1;
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
    <div class="col-lg-1" />
    <div class="col-lg-7 mt-2 mx-0 px-0">
        {#if item}
            <div class="card mt2">
                <div
                    class="d-flex flex-column flex-wrap-reverse align-items-end justify-content-end card-header-with-cover"
                    style="background: linear-gradient( 0deg, #212529 0%, rgba(255, 255, 255, 0) 37% ), url('{item.cover}') no-repeat; background-size:cover; background-position: center;"
                >
                    <div class="d-flex flex-row card-user-info">
                        <img
                            src={item.avatar
                                ? item.avatar
                                : "http://localhost/onics/style/default.png"}
                            alt="Avatar de {item.user}"
                            class="avatar main-avatar rounded-circle mr-2"
                            on:error={function () {
                                this.src =
                                    "http://localhost/onics/style/default.png";
                            }}
                        />
                        <div
                            class="d-flex flex-column text-white user-head-data"
                        >
                            <h3 class="user-info">
                                <b>
                                    {item.name}
                                </b>
                            </h3>
                            <span>
                                <b>{item.category.name}</b>
                                <small class="name"
                                    >{item.category.icon}
                                </small>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-body user-bio-more">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row justify-content-end">
                            <button type="button" class="btn btn-primary mr-1">
                                <Gicon icon="person_add" />
                                Unirse
                            </button>
                            <button
                                type="button"
                                class="btn btn-warning"
                                title="Denunciar"
                            >
                                <Gicon icon="flag" />
                            </button>
                        </div>
                        <i>{item.description}</i>
                    </div>
                </div>
            </div>
            <!-- feedList 
                <FeedList {feedList} bind:site_config />
            <InfiniteLoading spinner="wavedots" on:infinite={infiniteHandler} />
            -->

            <div class="card mt-2">
                <div class="card-header">
                    <b><Gicon icon="newspaper" /> Últimos temas</b>
                </div>
                <div class="card-body">
                    <ul class="post-list">
                        {#if post_list}
                            {#each post_list as post}
                                <li>
                                    <PostListItem {post} />
                                </li>
                            {/each}
                        {/if}
                    </ul>
                </div>
                <InfiniteLoading
                    spinner="wavedots"
                    on:infinite={infiniteHandler}
                    identifier={infiniteId}
                />
            </div>
        {/if}
    </div>
    <div class="col-lg-3">
        <div class="sticky-top">
            <div class="card mt-2">
                <div class="card-header">
                    <Gicon icon="info" /> Información
                </div>

                <div class="card-body">
                    {#if item}
                        <div
                            class="follow-stats d-flex flex-column cursor-default"
                        >
                            <div class="d-flex flex-row justify-content-evenly">
                                <span>
                                    <Gicon icon="chevron_right" /><b
                                        >{item.members.length}</b
                                    >
                                    Miembro{item.members.length > 1 ? "s" : ""}
                                </span>
                            </div>

                            <div
                                class="d-flex flex-column justify-content-center"
                            >
                                <span class="text-center">
                                    <Gicon
                                        icon="calendar_month"
                                    />&nbsp;Creada&nbsp;
                                    <b title={item.created}>{item.created}</b>
                                </span>
                                <span class="text-center"> por </span>
                                <span class="text-center">
                                    @<a use:link href="/{item.creator.user}">
                                        {item.creator.user}
                                    </a>
                                </span>
                            </div>
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
            <!-- Last members -->
            <div class="card mt-2">
                <div class="card-header">
                    <Gicon icon="people" /> Últimos Miembros
                </div>

                <div class="card-body">
                    {#if item}
                        <div
                            class="follow-stats d-flex flex-row cursor-default"
                        >
                            {#each item.members as member}
                                <span>
                                    <img
                                        src={member.avatar
                                            ? member.avatar
                                            : "http://localhost/onics/style/default.png"}
                                        on:error={function () {
                                            this.src =
                                                "http://localhost/onics/style/default.png";
                                        }}
                                        alt="Avatar de @{member.user}"
                                        class="avatar rounded-circle"
                                    />
                                </span>
                            {/each}
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
    ul.post-list,
    .last-comments-section {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .post-list li,
    .last-comments-section li {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0.5em;
    }

    .post-details {
        max-width: 75%;
    }
    .post-thumbnail {
        display: inline-block;
        width: 80px;
        height: 80px;
        background-size: cover !important;
        background-position: center !important;
        border-radius: 5px;
        margin-right: 0.2em;
    }
    .post-title {
        text-overflow: ellipsis;
        max-width: 100%;
        word-break: break-all;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
    }
    @media (max-width: 720px) {
        .post-thumbnail {
            width: 100%;
            height: 100px;
            margin-bottom: 0.5em;
        }
        .post-details {
            max-width: 100%;
        }
    }
</style>
