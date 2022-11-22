<script>
    import { fly } from "svelte/transition";
    import { api_request } from "../api.js";
    import ErrorModal from "../components/modals/errorModal.svelte";
    import { navigate } from "svelte-routing";

    export let site_config;

    let userlogin = { "9kro": "", "04529f": "" };
    let objs = { user: null, password: null, send: null };

    let modalError = false;
    let errorMessage = "There is not errors today";

    async function issueLogin() {
        objs.user = objs.password = objs.send = true;

        let result = await api_request(
            "login",
            "post",
            `9kro=${userlogin["9kro"]}&04529f=${userlogin["04529f"]}`
        );
        if (result.status == 0) {
            // show modal
            localStorage.token = null;
            errorMessage = "Datos incorrectos.";
            modalError = true;
        } else {
            localStorage.token = result.data;
            location.href = "/";
        }
        setTimeout(() => {
            objs.user = objs.password = objs.send = null;
        }, 1000);
    }
</script>

<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-xxl-3" />
    <div class="col-xxl-6 text-center pt-5 mx-0 px-0">
        <h3>Bienvenido a embe... mokyu?</h3>
        <p>
            El nombre no lo sé todavía, pero pone tu nombre de usuario y
            contraseña y eso dale man
        </p>
        <div class="row mx-0">
            <div class="col-3" />
            <div class="col-6">
                <form class="text-left login bg-dark">
                    <div class="mb-3">
                        <label for="username" class="form-label">Usuario</label>
                        <input
                            type="email"
                            name="username"
                            id="username"
                            class="form-control"
                            placeholder="Usuario"
                            bind:value={userlogin["9kro"]}
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
                            bind:value={userlogin["04529f"]}
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
            <div class="col-3" />
        </div>
    </div>
    <div class="col-xxl-3" />
</div>
<ErrorModal bind:visible={modalError}>
    {errorMessage}
</ErrorModal>
