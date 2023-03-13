<script context="module">
    import InstanceStatus from "../../models/InstanceStatus.js";
    const instanceStatuses = Object.keys(InstanceStatus);
</script>

<script>
    import SelectMenu from "../SelectMenu.svelte";
    import ApplicationService from "../../services/ApplicationService.js";
    import LoadingSpinner from "../LoadingSpinner.svelte";
    import {StatusColors} from "../../models/InstanceStatus.js";

    export let instance;
    export let onClick;
    export let onDelete;
    export let extended;

    let statusUpdatePromise;
    let instanceDeletePromise;

    let statusIndex;
    const updateStatusOverride = () => {
        if (instanceDeletePromise == null && statusIndex !== null) {
            const newStatus = instanceStatuses[statusIndex];
            statusUpdatePromise = ApplicationService.updateInstanceStatus(instance, newStatus);
            statusUpdatePromise.then(() => {
                instance.overriddenStatus = newStatus;
                statusUpdatePromise = null;
            });
        }
    }

    const sendInstanceHeartbeat = () => {
        if (statusUpdatePromise == null && instanceDeletePromise == null) {
            ApplicationService.sendInstanceHeartbeat(instance);
        }
    }

    const deleteInstance = () => {
        if (statusUpdatePromise == null) {
            instanceDeletePromise = ApplicationService.deleteInstance(instance);
            instanceDeletePromise.then(() => {
                onDelete();
                instanceDeletePromise = null;
            })
        }
    }
</script>

<li>
    <a href="#" on:click={onClick} class={extended ? "block bg-gray-50" : "block hover:bg-gray-50"}>
        <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
                <div class="truncate text-sm font-medium text-sky-600">
                    {instance.displayName}
                </div>
                <div class="ml-2 flex flex-shrink-0">
                    <span class={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-${StatusColors[instance.activeStatus]}-100 text-${StatusColors[instance.activeStatus]}-800`}>
                        Status: {instance.activeStatus}
                    </span>
                </div>
            </div>
        </div>
    </a>
    {#if extended}
        <div class="bg-white px-4 py-5 sm:p-6">
            <div class="grid grid-flow-col grid-cols-4 gap-6">
                <div class="col-span-3">
                    <div class="w-full sm:max-w-xs">
                        <h3 class="mb-2 text-base font-semibold text-gray-900">Status Override</h3>
                        <div class="sm:flex sm:items-center">
                            <SelectMenu items={instanceStatuses} placeholder={InstanceStatus[instance.activeStatus]} bind:selection={statusIndex} />
                            {#if statusIndex != null}
                                {#if statusUpdatePromise}
                                    <div class="ml-2">
                                        <LoadingSpinner />
                                    </div>
                                {:else}
                                    <button on:click={updateStatusOverride} type="button" class="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:mt-0 sm:ml-3 sm:w-auto">
                                        Update
                                    </button>
                                {/if}
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="col-span-1">
                    <h3 class="mb-2 text-base font-semibold text-gray-900">Actions</h3>
                    <div class="flex">
                        <button on:click={sendInstanceHeartbeat} type="button" class="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:mt-0 sm:w-auto">
                            Send Heartbeat
                        </button>
                        {#if instanceDeletePromise}
                            <div class="ml-2">
                                <LoadingSpinner/>
                            </div>
                        {:else}
                            <button on:click={deleteInstance} type="button" class="mt-3 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:mt-0 sm:ml-2 sm:w-auto">
                                De-register
                            </button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</li>