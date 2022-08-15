<script>
    export let video_info;
    /**
     * let video_info = { id : 'youtube video id', ... }
     */
    let video_visible = false;
</script>

{#if !video_visible && video_info}
    <span
        class="label-video"
        title="Click para ver el video"
        on:click={() => (video_visible = true)}
    >
        <img
            src="//i.ytimg.com/vi/{video_info.id}/hqdefault.jpg"
            alt="Video de Youtube"
            class="shout-image cursor-pointer"
        />
    </span>
{/if}

{#if video_info && video_visible}
    <iframe
        title="-"
        src="//www.youtube.com/embed/{video_info.id}?autoplay=1"
        class="video {video_info.id}"
        width="520"
        height="390"
        frameborder="0"
        allowfullscreen="1"
        autoplay="1"
    />
{/if}

<style>
    .shout-image {
        width: 100%;
        border-radius: 3px;
    }

    .label-video::before {
        content: "►";
        position: absolute;
        z-index: 999;
        background-color: rgb(0 0 0 / 92%);
        color: white;
        top: 46%;
        left: 46%;
        border-radius: 100px;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 82px;
        font-size: 52px;
        padding-left: 8px;
        cursor: pointer;
    }

    iframe.video {
        width: 100%;
        min-height: 50vh;
    }
</style>
