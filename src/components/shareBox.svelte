<script>
    import Gicon from "./gicon.svelte";
    import { api_request } from "../api.js";
    import ErrorModal from "./modals/errorModal.svelte";

    export let site_config;
    export let feedList = [];

    let modalError = false;
    let errorMessage = "There is not errors today";

    let shout_info = {
        text: "",
        attachment_type: 0,
        attachment: "",
        signature: "",
        user_key: site_config ? site_config.tknhash : "",
    };
    $: shout_info.user_key = site_config ? site_config.tknhash : "";

    async function shout() {
        let result = await api_request(
            "shout",
            "post",
            Object.keys(shout_info)
                .map((key) => key + "=" + encodeURIComponent(shout_info[key]))
                .join("&")
        );

        if (result.status == 0) {
            errorMessage = result.text ?? result.data;
            modalError = true;
        } else {
            feedList.data = [result.data, ...feedList.data];
            shout_info = {
                text: "",
                attachment_type: 0,
                attachment: "",
                signature: "",
                user_key: site_config ? site_config.tknhash : "",
            };
        }
    }
</script>

<div class="card my-2">
    <div class="card-body">
        <!--  e  -->
        <div class="sharebox-textarea d-flex flex-row">
            <img
                src="http://localhost/onics/uploads/1-1663916408_avatar.png"
                alt="Nekita's avatar"
                class="avatar rounded-circle mr-2"
            />
            <div
                class="form-control sharebox-area"
                contenteditable="true"
                bind:innerHTML={shout_info.text}
            />
            <!--<textarea
                class="form-control"
                placeholder="Comparte algo..."
                bind:value={shout_info.text}
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
    .avatar {
        width: 50px;
        height: 50px;
    }
    .sharebox-attachments {
        margin-left: 55px;
    }
    .sharebox-area {
        height: auto;
    }
</style>
