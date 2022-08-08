<script>
    import Gicon from "./gicon.svelte";
    import { link } from "svelte-navigator";
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
        </ul>
    </div>
</nav>

<style>
    .ugly-fix {
        padding-top: 2px;
    }
</style>
