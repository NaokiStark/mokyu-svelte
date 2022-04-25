<script>
    import FeedList from "../components/feedList.svelte";
    let feedList = {
        info: { page: 0 },
        data: [
            { body: "helo test" },
            { body: "helo test" },
            { body: "helo test" },
            { body: "helo test" },
        ],
    };
</script>

<FeedList {feedList} />
