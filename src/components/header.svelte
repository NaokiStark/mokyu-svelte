<script>
    import Gicon from "./gicon.svelte";
    import { link, useLocation } from "svelte-navigator";
    import { backendRoot } from "../api.js";
    import { fly, fade } from "svelte/transition";

    export let user_data;

    const location = useLocation();
    let actual_location = $location;

    let toggle_visible_menu = false;

    $: {
        actual_location = $location;
        console.log(actual_location);
    }

    function location_contains(word) {
        return actual_location.pathname.indexOf(word) > -1;
    }

    function is_home() {
        return actual_location.pathname.endsWith("/");
    }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <button
            class="navbar-toggler mr-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            on:click={() => (toggle_visible_menu = !toggle_visible_menu)}
        >
            <span class="navbar-toggler-icon" />
        </button>
        <a use:link class="navbar-brand" href="/">Emburns</a>
        <div
            class="collapse navbar-collapse {toggle_visible_menu ? 'show' : ''}"
            id="navbarSupportedContent"
        >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {#if user_data}
                    <li class="nav-item">
                        <a
                            use:link
                            class="nav-link {is_home() ? 'active' : ''}"
                            aria-current="page"
                            href="/"
                        >
                            <Gicon icon="home" /> Mi
                        </a>
                    </li>
                {/if}
                <li class="nav-item">
                    <a
                        use:link
                        class="nav-link {location_contains('explorar')
                            ? 'active'
                            : ''}"
                        href="/explorar"
                    >
                        <Gicon icon="explore" /> Explorar
                    </a>
                </li>

                <!--
                <li class="nav-item">
                    <a
                        use:link
                        class="nav-link {location_contains('comunidad') ||
                        location_contains('tema')
                            ? 'active'
                            : ''}"
                        href="/comunidades"
                    >
                        <Gicon icon="workspaces_filled" /> Comunidades
                    </a>
                </li>
                -->
                <li class="nav-item d-flex d-lg-none">
                    <form class="d-flex">
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Search"
                        />
                        <button class="btn btn-outline-primary" type="submit"
                            ><Gicon icon="search" />
                        </button>
                    </form>
                </li>
                {#if user_data}
                    {#if Object.keys(user_data ?? {}).length === 0}
                        <li class="nav-item d-flex d-lg-none mt-3">
                            <a
                                use:link
                                class="btn btn-primary"
                                href="/register"
                            >
                                <Gicon icon="person_add_alt_1" /> Registro
                            </a>
                        </li>
                        <li class="nav-item d-flex d-lg-none mt-3">
                            <a
                                use:link
                                class="nav-link text-white"
                                href="/login"
                            >
                                Ingresar
                            </a>
                        </li>
                    {:else if user_data.username}
                        <li
                            class="nav-item user-menu rounded d-flex mt-1 mt-lg-0"
                        >
                            <a
                                use:link
                                class="nav-link text-white user-menu-toggler pl-1"
                                href="/{user_data.username}"
                            >
                                <img
                                    src={user_data.avatar}
                                    alt="{user_data.username}'s avatar"
                                    class="avatar-mini rounded-circle mr-2 svelte-wvgsce"
                                    on:error={() =>
                                        (this.src = `${backendRoot}style/default.png`)}
                                />
                                {user_data.username}
                            </a>
                        </li>
                    {/if}
                {:else}
                    <li class="nav-item d-flex d-lg-none mt-3">
                        <a use:link class="btn btn-primary" href="/register">
                            <Gicon icon="person_add_alt_1" /> Registro
                        </a>
                    </li>
                    <li class="nav-item d-flex d-lg-none mt-3">
                        <a use:link class="nav-link text-white" href="/login">
                            Ingresar
                        </a>
                    </li>
                {/if}
            </ul>
        </div>
        <form class="d-none d-lg-flex">
            <input
                class="form-control me-2"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
            />
            <button class="btn btn-outline-primary" type="submit"
                ><Gicon icon="search" />
            </button>
        </form>
        <div class="dummy d-block d-lg-none" />
        <ul
            class="navbar-nav me-auto mb-2 mb-lg-0 ml-md-1 ugly-fix d-none d-lg-flex"
        >
            {#if Object.keys(user_data ?? {}).length === 0}
                <li class="nav-item">
                    <a use:link class="btn btn-primary" href="/register">
                        <Gicon icon="person_add_alt_1" /> Registro
                    </a>
                </li>
                <li class="nav-item">
                    <a use:link class="nav-link text-white" href="/login">
                        Ingresar
                    </a>
                </li>
            {:else if user_data.user}
                <li class="nav-item user-menu rounded">
                    <a
                        use:link
                        class="nav-link text-white user-menu-toggler"
                        href="/{user_data.user}"
                    >
                        <img
                            src={user_data.avatar}
                            alt="{user_data.user}'s avatar"
                            class="avatar-mini rounded-circle mr-2 svelte-wvgsce"
                            on:error={() =>
                                (this.src = `${backendRoot}style/default.png`)}
                        />
                        {user_data.user}
                    </a>
                </li>
            {/if}
        </ul>
    </div>
</nav>

<style>
    .ugly-fix {
        padding-top: 2px;
    }
    .avatar-mini {
        width: 32px;
        height: 32px;
    }
    .user-menu {
        border: 1px solid #6c757d;
    }
    .user-menu-toggler {
        padding: 0 0.1em;
        height: calc(1.5em + 0.75rem + 2px);
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
