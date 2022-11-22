<script>
    import Gicon from "./gicon.svelte";
    import { link } from "svelte-navigator";
    export let user_data;
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a use:link class="navbar-brand" href="/">Emburns</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a
                        use:link
                        class="nav-link active"
                        aria-current="page"
                        href="/"
                    >
                        <Gicon icon="home" /> Mi
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <Gicon icon="explore" /> Explorar
                    </a>
                </li>
                <!--
                <li class="nav-item">
                    <a use:link class="nav-link" href="/posts">
                        <Gicon icon="feed" /> Posts
                    </a>
                </li>
                -->
                <li class="nav-item">
                    <a use:link class="nav-link" href="/comunidades">
                        <Gicon icon="workspaces_filled" /> Comunidades
                    </a>
                </li>
            </ul>
        </div>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ml-md-1 ugly-fix">
            {#if Object.keys(user_data).length === 0}
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
