<script>
    import Gicon from "./gicon.svelte";
</script>

<div class="card my-2">
    <div class="card-body">
        <!--  e  -->
        <div class="sharebox-textarea d-flex flex-row">
            <img
                src="http://localhost/onics/uploads/1-1567136449_avatar.png"
                alt="Nekita's avatar"
                class="avatar rounded-circle mr-2"
            />
            <textarea class="form-control" placeholder="Comparte algo..." />
        </div>
        <div class="sharebox-attachments d-flex flex-row mt-2">
            <button
                type="button"
                class="btn btn-outline-primary mx-1"
                title="Imagen"
            >
                <Gicon icon="image" />
            </button>
            <button
                type="button"
                class="btn btn-outline-primary mx-1"
                title="Video"
            >
                <Gicon icon="movie" />
            </button>
            <button
                type="button"
                class="btn btn-outline-primary mx-1"
                title="Enlace"
            >
                <Gicon icon="link" />
            </button>
        </div>
    </div>
    <div class="card-footer d-flex flex-row justify-content-end">
        <button type="button" class="btn btn-primary">
            <Gicon title="Publica" icon="send" class="cursor-pointer" />
            Compartir
        </button>
    </div>
</div>

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
    .sharebox-attachments {
        margin-left: 55px;
    }
</style>
