<script>
    import { fly } from "svelte/transition";
    import { api_request } from "../api.js";
    import ErrorModal from "../components/modals/errorModal.svelte";
    import { navigate } from "svelte-routing";
    import { Body } from "svelte-body"; // weird

    export let site_config;

    let userlogin = { user: "", password: "" };
    let objs = { user: null, password: null, send: null };

    let modalError = false;
    let errorMessage = "There is not errors today";

    async function issueLogin() {
        objs.user = objs.password = objs.send = true;

        let result = await api_request("user/login", "post", userlogin);
        if (typeof result == "object") {
            localStorage.token = result.token;
            localStorage.userData = JSON.stringify(result.userData);
            location.href = "/";
        } else {
            localStorage.clear();
            errorMessage = result;
            modalError = true;
        }

        setTimeout(() => {
            objs.user = objs.password = objs.send = null;
        }, 1000);
    }
</script>

<Body style="background: #191d21;" />

<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-xxl-3" />
    <div class="col-xxl-6 text-center pt-5 mx-0 px-0">
        <h3>Ingresar a Emburns</h3>
        <p>Poné tu nombre de usuario y contraseña</p>
        <div class="row mx-0">
            <div class="col-md-3" />
            <div class="col-md-6 p-0">
                <form class="text-left login bg-dark">
                    <div class="mb-3">
                        <label for="username" class="form-label">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            class="form-control"
                            placeholder="Usuario"
                            bind:value={userlogin.user}
                            disabled={objs.user || null}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label"
                            >Contraseña</label
                        >
                        <input
                            type="password"
                            name="password"
                            id="password"
                            class="form-control"
                            placeholder="Contraseña"
                            bind:value={userlogin.password}
                            disabled={objs.password || null}
                        />
                    </div>
                    <div class="d-flex justify-content-end">
                        <button
                            type="submit"
                            class="btn btn-primary"
                            disabled={objs.send || null}
                            on:click={issueLogin}
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-md-3" />
        </div>
    </div>
    <div class="col-xxl-3" />
</div>
<ErrorModal bind:visible={modalError}>
    {@html JSON.parse(errorMessage).message.replace("\n", "<br>")}
</ErrorModal>

<style>
    .login {
        max-width: 97%;
    }
</style>
