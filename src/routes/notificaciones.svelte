<script>
    import { fly } from "svelte/transition";
    import { api_request } from "../api.js";
    import ErrorModal from "../components/modals/errorModal.svelte";
    import { navigate } from "svelte-routing";
    import { Body } from "svelte-body"; // weird
    import Gicon from "../components/gicon.svelte";
    import NotificationItem from "../components/notificationItem.svelte";

    let items = [
        {
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
                },
            },
            readed: false,
        },
        {
            type: 1,
            userid: 1,
            from: {
                id: 2,
                username: "Emburns",
                avatar: "https://pbs.twimg.com/media/FrPBkpNXwAEyhbh?format=png&name=small",
            },
            info: {
                reaction: {
                    id: 1,
                    reactionText: "Me gusta",
                    reactionEmoji: "🍆",
                },
            },
            readed: true,
        },
        {
            type: 2,
            userid: 1,
            from: {
                id: 1,
                username: "Nekita",
                avatar: "https://pbs.twimg.com/profile_images/1665256777473040384/n-besrXX_400x400.jpg",
            },
            info: null,
            readed: true,
        },
        {
            type: 2,
            userid: 2,
            from: {
                id: 2,
                username: "Emburns",
                avatar: "https://pbs.twimg.com/media/FrPBkpNXwAEyhbh?format=png&name=small",
            },
            info: null,
            readed: true,
        },
    ];
</script>

<Body style="background: #191d21;" />
<div class="row mx-0 mt-3">
    <!-- padding -->
    <div class="col-lg-1 col-xl-2" />

    <div
        class="col-lg-7 col-xl-5"
        in:fly={{ opacity: 0, y: 50, duration: 300 }}
    >
        <!-- main row -->
        <div class="card">
            <div class="card-header">
                <Gicon icon="notifications" /> Notificaciones
            </div>

            <!-- notifications container -->
            <div class="card-body notifications-container">
                {#each items as item}
                    <NotificationItem {item} />
                {/each}
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-xxl-3 mt-1 mt-xl-0">
        <!-- sidebar -->
        <div class="card">
            <div class="card-header">
                <Gicon icon="payments" /> Embers Naranja
            </div>
            <div class="card-body">
                Para poder shoutear más, activá tu subscripcion a
                <a herf="#" class="btn btn-primary">
                    <Gicon icon="paid" /> Embers Naranja <Gicon icon="paid" />
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    .notifications-container > .card {
        margin: 0.25em 0;
    }
    .notifications-container > .card > .card-footer {
        font-size: 0.9em;
        padding-top: 0.3em;
        padding-bottom: 0.3em;
    }
</style>
