<script>
    import Gicon from "./gicon.svelte";

    export let item = {
        type: 1,
        userid: 1,
        from: {
            id: 1,
            username: "Nekita",
            avatar: "https://pbs.twimg.com/profile_images/1665256777473040384/n-besrXX_400x400.jpg",
        },
        info: {
            reaction: {
                id: 1,
                reactionText: "Me gusta",
                reactionEmoji: "❤️",
                loves: [],
            },
        },
        readed: true,
    };

    let notification_text = ["", "Reaccionó a tu Shout", "Ahora te sigue"];
    let notification_icon = ["", "", "person_add"];
</script>

<div class="notification-item card mb-1 {!item.readed ? 'highlighted' : ''}">
    <div class="card-body d-flex">
        <img
            src={item.from.avatar}
            class="avatar rounded-circle"
            alt="Avatar de {item.from.username}"
        />
        <div class="d-flex flex-column flex-wrap ml-3">
            <span>
                @<a href="" class="link-primary">{item.from.username}</a>
                {notification_text[item.type]}
                {#if item.type == 1}
                    {item.info.reaction.reactionEmoji}
                {:else if notification_icon[item.type].length > 0}
                    <Gicon icon={notification_icon[item.type]} />
                {/if}
            </span>
            <span>
                <small class="text-muted"> Hace 10 minutos </small>
            </span>
        </div>
    </div>
</div>

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
    .unreaded {
    }
</style>
