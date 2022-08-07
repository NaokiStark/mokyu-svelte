<script>
    import { fly } from "svelte/transition";
</script>

<div class="row mx-0" in:fly={{ opacity: 0, y: 50, duration: 300 }}>
    <div class="col-xxl-3" />
    <div class="col-xxl-6 text-center pt-5 mx-0 px-0">
        <h3>Registro a embe... mokyu?</h3>
        <p>
            El nombre no lo sé todavía, pero pone tus datos que no vamos a hacer
            nada con eso, dale man
        </p>
        <div class="row mx-0">
            <div class="col-3 m-0 p-0" />
            <div class="col-6 ">
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
            <div class="col-3 m-0 p-0" />
        </div>
    </div>
    <div class="col-xxl-3" />
</div>
