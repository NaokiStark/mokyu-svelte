<script>
    import { fly } from "svelte/transition";
    export let site_config;
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
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary"
                            >Ingresar</button
                        >
                    </div>
                </form>
            </div>
            <div class="col-3" />
        </div>
    </div>
    <div class="col-xxl-3" />
</div>
