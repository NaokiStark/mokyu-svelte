<script>
    import Gicon from "./gicon.svelte";
    import { api_request } from "../api.js";
    import ErrorModal from "./modals/errorModal.svelte";
    import ShareboxAttachment from "./shareboxAttachment.svelte";
    import autosize from "svelte-autosize";

    export let site_config;
    export let feedList = [];
    export let user_data;
    let modalError = false;
    let errorMessage = "There is not errors today";

    let shout_info = {
        text: "",
        attachment_type: 0,
        attachment: "",
    };

    let attachmentObject = {
        raw: "",
        provider: "",
        id: null,
        type: 0,
    };

    $: attachmentObject,
        () => {
            (shout_info.attachment = attachmentObject.raw),
                (shout_info.attachment_type = attachmentObject.type);
        };

    let sharebtn_disabled = false;

    async function shout() {
        if (shout_info.text.length < 1 && shout_info.attachment.length < 10) {
            errorMessage = "El shout no puede estar vacío";
            modalError = true;
            return;
        }
        sharebtn_disabled = true;

        let result = await api_request("feed", "post", shout_info);

        if (result.status == 0) {
            errorMessage = result.text ?? result.item;
            modalError = true;
        } else {
            feedList.data = [result.item, ...feedList.data];
            shout_info = {
                text: "",
                attachment_type: 0,
                attachment: "",
            };
        }
        setTimeout(() => {
            sharebtn_disabled = false;
        }, 1000);
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
            <!--
            <div
                class="form-control sharebox-area"
                contenteditable="true"
                bind:innerHTML={shout_info.text}
            />
            -->
            <textarea
                class="form-control"
                placeholder="Comparte algo..."
                bind:value={shout_info.text}
                use:autosize
            />
        </div>
        <ShareboxAttachment bind:attachment={attachmentObject} />
    </div>
    <div class="card-footer d-flex flex-row justify-content-end">
        <button
            type="button"
            class="btn btn-primary"
            on:click={shout}
            disabled={sharebtn_disabled}
        >
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
        user-modify: read-write-plaintext-only;
    }
</style>
