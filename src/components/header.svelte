<script>
    let mobile_menu = false;

    const toggle_mobile_menu = () => {
        mobile_menu = !mobile_menu;
    };
</script>

<div class="relative main-header">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div
            class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
        >
            <div class="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                    <span class="sr-only">Mokyu</span>
                    <!--
                    <img
                        class="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt=""
                    />
                    -->
                    <h3 class=" text-xl font-semibold">Mokyu</h3>
                </a>
            </div>
            <div class="-mr-2 -my-2 md:hidden" on:click={toggle_mobile_menu}>
                <button
                    type="button"
                    class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    aria-expanded="false"
                >
                    <span class="sr-only">Open menu</span>
                    <!-- Heroicon name: outline/menu -->
                    <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            <nav class="hidden md:flex space-x-10">
                <span class="text-base font-medium text-white cursor-pointer">
                    Inicio
                </span>
                <span class="text-base font-medium text-white cursor-pointer">
                    Descubre
                </span>
                <span class="text-base font-medium text-white cursor-pointer">
                    Posts
                </span>
            </nav>
            <div
                class="hidden md:flex items-center justify-end md:flex-1 lg:w-0"
            >
                <span
                    href="#"
                    class="whitespace-nowrap text-base font-medium text-white cursor-pointer"
                >
                    Sign in
                </span>
                <span
                    href="#"
                    class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white cursor-pointer"
                >
                    Sign up
                </span>
            </div>
        </div>
    </div>

    <div
        class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden {mobile_menu
            ? 'block'
            : 'hidden'}"
    >
        <div
            class="header-menu rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50"
        >
            <div class="pt-5 pb-6 px-5">
                <div class="flex items-center justify-between">
                    <div>
                        <img
                            class="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                    </div>
                    <div class="-mr-2">
                        <button
                            type="button"
                            class=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            on:click={toggle_mobile_menu}
                        >
                            <span class="sr-only">Close menu</span>
                            <!-- Heroicon name: outline/x -->
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="py-6 px-5 space-y-6" />
        </div>
    </div>
</div>
