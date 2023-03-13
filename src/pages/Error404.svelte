<script>
    import {Link, navigate} from "svelte-navigator";

    const goBack = () => navigate(-1);
</script>

<main class="flex min-h-screen bg-cover bg-top sm:bg-top">
    <div class="max-w-7xl m-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p class="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">
            Error 404
        </p>
        <h1 class="mt-2 text-4xl font-extrabold text-black tracking-tight sm:text-5xl focus:outline-0">
            Uh oh! I think you’re lost.
        </h1>
        <p class="mt-2 text-lg font-medium text-black text-opacity-50">
            It looks like the page you’re looking for doesn't exist.
        </p>
        <span tabindex="0" on:click={goBack} class="inline-flex items-center px-4 py-2 mt-6 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 hover:bg-sky-100 cursor-pointer">
            Go Back
        </span>
        <Link to="/" class="inline-flex items-center px-4 py-2 mt-6 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 hover:bg-sky-100">
            Go Home
        </Link>
    </div>
</main>