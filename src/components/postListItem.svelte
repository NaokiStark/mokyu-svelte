<script>
    import { link } from "svelte-navigator";
    import { getElapsed } from "../utils";

    export let post;
</script>

{#if post}
    <a use:link href="/tema/{post.id}" class="post-item">
        <span
            style="background: url('{post.caption}') no-repeat"
            class="post-thumbnail"
        />
        <div class="d-flex flex-column ml-1 post-details">
            <span class="post-title">
                <b> {post.title} </b>
            </span>
            <small class="text-muted-alt"
                >Creado por @<span class="text-muted-alt-alt"
                    >{post.user.username}</span
                >
                {getElapsed(post.created)} en
                <span class="badge badge-primary">{post.community.name}</span>
            </small>
            <span class="text-muted-alt">
                <span class="badge badge-primary">
                    {post.community.category.icon}
                    {post.community.category.name}
                </span>
            </span>
        </div>
    </a>
{:else}
    <span
        style="background: url(http://localhost/onics/uploads/1-1559773776_anime_anime_girls_cat_girl_glitch_art_pink_artwork_digital_art-1469665.jpg) no-repeat"
        class="post-thumbnail"
    />
    <div class="d-flex flex-column ml-1 post-details">
        <span class="post-title">
            <b> Esto es una prueba, no se si ponerlo tipo lista </b>
        </span>
        <small class="text-muted-alt"
            >Creado por @<span class="text-muted-alt-alt">Nekita</span> hace 3 días</small
        >
        <span class="text-muted-alt">
            <span class="badge badge-primary"> 🖼️ Imágenes </span>
        </span>
    </div>
{/if}

<style>
    .post-details {
        max-width: 100%;
    }
    .post-item {
        width: 100%;
    }
    .post-thumbnail {
        display: inline-block;
        width: 80px;
        height: 80px;
        background-size: cover !important;
        background-position: center !important;
        border-radius: 5px;
        margin-right: 0.2em;
    }
    .post-title {
        text-overflow: ellipsis;
        max-width: 100%;
        word-break: break-all;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
    }
    a,
    a > * {
        color: white;
    }
    a {
        display: flex;
    }

    @media (max-width: 720px) {
        .post-thumbnail {
            width: 100%;
            height: 100px;
            margin-bottom: 0.5em;
        }
        .post-details {
            /*max-width: 61%;*/
        }
        .post-item {
            flex-direction: column;
            width: 100%;
        }
    }
</style>
