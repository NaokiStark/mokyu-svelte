<script>
    import Gicon from "./gicon.svelte";
    import ReactionsBox from "./reactionsBox.svelte";
    export let item = { body: "hello test" };

    let reactionsBoxOpen = false;
</script>

<div class="card my-2">
    <div class="card-header d-flex">
        <img
            src="http://localhost/onics/uploads/1-1567136449_avatar.png"
            alt="Nekita's avatar"
            class="avatar rounded-circle mr-2"
        />
        <div class="d-flex flex-column">
            <span class="user-info">Nekita</span>
            <small class="date">Hace 5 minutos</small>
        </div>
    </div>
    <div class="card-body">
        <p class="card-text">{item.body}</p>
    </div>
    <div class="card-footer d-flex justify-content-end text-muted">
        <Gicon
            title="Reacciones"
            icon="add_reaction"
            class="cursor-pointer"
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
    }
</style>
