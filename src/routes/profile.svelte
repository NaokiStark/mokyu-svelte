<script>
    import { fly, fade } from "svelte/transition";
    import { api_request } from "../api.js";
    import Gicon from "../components/gicon.svelte";
    import FeedList from "../components/feedList.svelte";

    import { Body } from "svelte-body"; // weird

    export let username;

    let item = null;
    let user_stats = null;

    $: get_user(username).then((x) => {
        item = x.data;
    });

    $: get_stats(item).then((x) => {
        user_stats = x.data;
    });

    function get_user(sid) {
        return api_request(`username/${sid}`);
    }

    function get_stats(sid) {
        if (!sid) {
            return Promise.reject();
        }
        return api_request(`userStats/${sid.id}`);
    }

    let feedList = {
        info: { page: 0 },
        data: null,
    };

    $: get_user_feed(item).then((x) => {
        feedList.data = x.data;
    });

    function get_user_feed(sid) {
        if (!sid) {
            return Promise.reject();
        }
        return api_request(`feed_profile/${sid.id}`);
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
                    style="background: linear-gradient( 0deg, #212529 18%, rgba(255, 255, 255, 0) 100% ), url('{item.cover}') no-repeat; background-size:cover; background-position: center;"
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
                                    {item.user}
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
                            <span
                                ><b>{item.rank_info.fullname}</b>
                                <small class="name">({item.rank} karma)</small
                                ></span
                            >
                        </div>
                    </div>
                </div>
                <div class="card-body user-bio-more">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row justify-content-end">
                            <button type="button" class="btn btn-primary mr-1">
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
                                class="btn btn-warning"
                                title="Denunciar"
                            >
                                <Gicon icon="flag" />
                            </button>
                        </div>
                        <i>{item.quote}</i>
                    </div>
                </div>
            </div>
            <FeedList {feedList} />
        {/if}
    </div>
    <div class="col-lg-3">
        <div class="card mt-2">
            <div class="card-header">
                <Gicon icon="info" /> Información
            </div>

            <div class="card-body">
                {#if user_stats}
                    <div class="follow-stats d-flex flex-column cursor-default">
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
                        <div class="d-flex flex-row justify-content-center">
                            <Gicon icon="calendar_month" />&nbsp;Se unió&nbsp;
                            <b title={item.created}>{item.created_elapsed}</b>
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

        <div class="card mt-2">
            <div class="card-header">No sé que poner acá</div>
            <div class="card-body">En serio...</div>
        </div>

        <div class="card mt-2">
            <div class="card-header">EEMBRSS</div>
            <div class="card-body">
                WEA CTM JUSTO ESTA SE ME OLVIDO Q SE PONER ACA
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
</style>
