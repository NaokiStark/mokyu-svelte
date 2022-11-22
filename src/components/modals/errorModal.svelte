<script>
    //use imports
    import Modal from "./modal.svelte";
    import ModalBtnClose from "./modal-btn-close.svelte";

    // set visibility
    export let visible = false;
</script>

<!-- Recommendation: always bind `visible` value -->
<Modal bind:visible modal_style="top">
    <div class="card-header">
        <h3>Error!</h3>
    </div>
    <div class="card-body">
        <p><slot /></p>
    </div>
    <div class="card-footer d-flex justify-content-end">
        <ModalBtnClose>Cerrar</ModalBtnClose>
    </div>
</Modal>
