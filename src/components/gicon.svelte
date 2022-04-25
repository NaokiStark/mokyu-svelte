<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // icon set: https://fonts.google.com/icons?icon.style=Filled&icon.set=Material+Icons
    export let icon = "stream";

    let cclass = "";
    export { cclass as class };
    let ctitle = "";
    export { ctitle as title };
</script>

<span
    class="material-icons {cclass}"
    on:click={() => dispatch("click")}
    title={ctitle}
>
    {icon}
</span>

<style>
    .material-icons {
        vertical-align: bottom;
    }
</style>
