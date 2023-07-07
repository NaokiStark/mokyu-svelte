<script>
    import { fly } from "svelte/transition";
    export let site_config;
    import { Body } from "svelte-body"; // weird
</script>

<Body style="background: #191d21;" />

<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-xxl-3" />
    <div class="col-xxl-6 text-center pt-5 mx-0 px-0">
        <h3>Registro a Emburns</h3>
        <p>Poné tus datos para registrarte</p>
        <div class="row mx-0">
            <div class="col-md-3 m-0 p-0" />
            <div class="col-md-6 p-0">
                <form class="text-left register bg-dark">
                    <div class="mb-3">
                        <label for="username" class="form-label">Usuario</label>
                        <input
                            type="email"
                            name="username"
                            id="username"
                            class="form-control"
                            placeholder="Usuario"
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
                        />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            class="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary"
                            >Registrate</button
                        >
                    </div>
                </form>
            </div>
            <div class="col-md-3 m-0 p-0" />
        </div>
    </div>
    <div class="col-xxl-3" />
</div>

<style>
    .register {
        max-width: 97%;
    }
</style>
