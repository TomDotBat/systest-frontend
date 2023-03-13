<script>
    import InstanceRow from "./InstanceRow.svelte";

    export let application;
    export let extendedRow;

    const onRowClick = (idx) => extendedRow = extendedRow === idx ? null : idx;

    let instances;
    $: instances = application.instances;

    const onRowDelete = (idx) => {
        instances.splice(idx, 1);
        extendedRow = null;
    };
</script>

<div class="mx-auto max-w-none">
    <div class="bg-white sm:rounded-lg sm:shadow">
        <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div class="ml-4 mt-2">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                        {application.displayName}
                    </h3>
                </div>
            </div>
        </div>
        <ul class="divide-y divide-gray-200">
            {#each instances as instance, index}
                <InstanceRow instance={instance} extended={index === extendedRow} onClick={() => onRowClick(index)} onDelete={() => onRowDelete(index)} />
            {:else}
                <li>
                    <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                            <div class="truncate text-sm font-medium text-gray-500">
                                No instances registered
                            </div>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</div>