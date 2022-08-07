<script>
    import Gicon from "./gicon.svelte";
</script>

<div class="card my-2">
    <div class="card-header d-flex">
        <div class="placeholder-glow avatar rounded-circle mr-2">
            <span class="avatar-placeholder placeholder rounded-circle" />
        </div>

        <div class="d-flex flex-column shout-header-placeholder">
            <span class="user-info placeholder-wave">
                <span class="placeholder col-6 rounded" />
            </span>
            <small class="date placeholder-wave"
                ><span class="placeholder col-5 rounded" /></small
            >
        </div>
    </div>
    <div class="card-body">
        <p class="card-text placeholder-wave">
            <span class="placeholder placeholder-wave col-9 rounded" />
            <br />
            <span class="placeholder placeholder-wave col-7 rounded" />
            <br />
            <span class="placeholder placeholder-wave col-5 rounded" />
            <br />
        </p>
    </div>
    <div class="card-footer d-flex justify-content-end text-muted">
        <span class="placeholder" />
    </div>
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

    .avatar-placeholder {
        width: 100%;
        height: 100%;
    }

    .shout-header-placeholder {
        min-width: 30%;
    }
</style>
