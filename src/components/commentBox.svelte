<script>
    import Gicon from "./gicon.svelte";
    import { api_request } from "../api.js";
    import ErrorModal from "./modals/errorModal.svelte";

    export let site_config;
    export let feedList = [];
    export let user_data;
    export let feedId = 0;
    export let comment_info = {
        text: "",
        attachment: "",
        attachmentType: 0,
        nsfw: false,
        parent: feedId,
    };

    let modalError = false;
    let errorMessage = "There is not errors today";

    async function shout() {
        comment_info.parent = feedId;
        let result = await api_request("comment", "post", comment_info);

        if (result.status == 0) {
            errorMessage = result.text ?? result.item;
            modalError = true;
        } else {
            console.log(result.item);
            feedList = [result.item, ...feedList];
            comment_info = {
                text: "",
                attachment: "",
                attachmentType: 0,
                nsfw: false,
                parent: feedId,
            };
        }
    }
</script>

<div class="card my-2">
    <div class="card-body">
        <!--  e  -->
        <div class="sharebox-textarea d-flex flex-row">
            {#if user_data}
                <img
                    src={user_data.avatar}
                    alt="{user_data.username}'s avatar"
                    class="avatar rounded-circle mr-2"
                />
            {:else}
                <div class="fake_avatar rounded-circle mr-2" />
            {/if}
            <div
                class="form-control sharebox-area"
                contenteditable="true"
                bind:innerHTML={comment_info.text}
                placeholder="Responde este shout"
            />
            <!--<textarea
                class="form-control"
                placeholder="Comparte algo..."
                bind:value={comment_info.text}
            />-->
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
        <button type="button" class="btn btn-primary" on:click={shout}>
            <Gicon title="Publica" icon="send" class="cursor-pointer" />
            Compartir
        </button>
    </div>
</div>
<ErrorModal bind:visible={modalError}>
    {errorMessage}
</ErrorModal>

<style>
    .avatar,
    .fake_avatar {
        width: 50px;
        height: 50px;
    }

    .fake_avatar {
        background-color: #333;
        display: inline-block;
    }
    .sharebox-attachments {
        margin-left: 55px;
    }
    .sharebox-area {
        height: auto;
    }
</style>
