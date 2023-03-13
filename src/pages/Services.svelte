<script>
    import Navbar from "../components/Navbar/index.svelte";
    import Application from "../components/ApplicationCard/index.svelte";
    import ApplicationService from "../services/ApplicationService.js";
    import Error from "../components/Alerts/Error.svelte";
    import LoadingSpinner from "../components/LoadingSpinner.svelte";

    let getAllPromise = ApplicationService.getAll();
</script>

<Navbar/>
<div class="py-8">
    <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-4">
            {#await getAllPromise}
                <LoadingSpinner color="sky-500" />
            {:then applications}
                {#each applications as application}
                    <Application application={application} />
                {:else}
                    <div class="text-center">
                        <h3 class="mt-2 text-sm font-semibold text-gray-900">
                            No services registered
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                            Get started by registering your service through SysTest.
                        </p>
                    </div>
                {/each}
            {:catch error}
                <Error title="There was an error while fetching registered services"
                   description={error.message}
                   showButtons={true}
                   retryAction={() => getAllPromise = ApplicationService.getAll()}
                />
            {/await}
        </div>
    </main>
</div>