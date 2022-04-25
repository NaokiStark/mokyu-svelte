<script>
    export let options = {};
</script>

<div class="reactions-box position-absolute">
    <div class="card">
        <div class="card-body d-flex emoji-list">
            <span class="cursor-pointer">😂</span>
            <span class="cursor-pointer">😂</span>
            <span class="cursor-pointer">😂</span>
            <span class="cursor-pointer">😂</span>
            <span class="cursor-pointer">😂</span>
        </div>
    </div>
</div>

<style>
    .reactions-box {
        bottom: -3em;
        right: 3em;
        z-index: 22;
    }
    .emoji-list {
        font-size: 2em;
    }
</style>
