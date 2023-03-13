<script>
    import {JSONEditor} from "svelte-jsoneditor";
    import HeadersTable from "../HeadersTable.svelte";

    export let request;
    const response = request.response
</script>


<div class="mx-auto max-w-none">
    <div class="bg-white sm:rounded-lg sm:shadow">
        <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div class="ml-4 mt-2">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                        <span class="font-semibold text-sky-600">Response:</span> <span class="font-medium text-gray-700">{request.method} {request.app}:{request.instanceId}{request.path}</span>
                    </h3>
                </div>
                <div class="ml-4 mt-2 flex-shrink-0">
                    <span class={(response.status >= 200 && response.status < 300) ? "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800"
                            : "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-red-100 text-red-800"}>
                        Status: {response.status}
                    </span>
                </div>
            </div>
        </div>
        <div class="px-4 py-4 sm:px-6">
            <label class="block text-sm font-medium leading-6 text-gray-900">Headers</label>
            <div class="mt-2 mb-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <HeadersTable headers={response.headers} readOnly={true} />
            </div>
            <label class="block text-sm font-medium leading-6 text-gray-900">Body</label>
            {#if response.body == null || response.body === ""}
                <div class="truncate text-sm font-medium text-gray-500">
                    The response body was empty.
                </div>
            {:else}
                <JSONEditor content={{text: response.body}} mode="tree" readOnly={true} navigationBar={false} mainMenuBar={false}/>
            {/if}
            <div class="mt-2 truncate text-sm font-medium text-gray-500 text-right">
                Responded in {response.time - request.time}ms
            </div>
        </div>
    </div>
</div>
