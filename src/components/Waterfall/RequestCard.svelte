<script>
    import ResponseCard from "./ResponseCard.svelte";
    import {JSONEditor} from "svelte-jsoneditor";
    import HeadersTable from "../HeadersTable.svelte";

    export let request;
</script>

<div class="mx-auto max-w-none">
    <div class="bg-white sm:rounded-lg sm:shadow">
        <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div class="ml-4 mt-2">
                    <h3 class="text-base leading-6">
                        <span class="font-semibold text-sky-600">Request:</span> <span class="font-medium text-gray-700">{request.method} {request.app}:{request.instanceId}{request.path}</span>
                    </h3>
                </div>
            </div>
        </div>
        <div class="px-4 py-4 sm:px-6">
            <label class="block text-sm font-medium leading-6 text-gray-900">Headers</label>
            <div class="mt-2 mb-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <HeadersTable headers={request.headers} readOnly={true} />
            </div>
            <label class="block text-sm font-medium leading-6 text-gray-900">Body</label>
            {#if request.body == null || request.body === ""}
                <div class="flex items-center justify-between">
                    <div class="truncate text-sm font-medium text-gray-500">
                        The request body was empty.
                    </div>
                </div>
            {:else}
                <JSONEditor content={{text: request.body}} mode="tree" readOnly={true} navigationBar={false} mainMenuBar={false}/>
            {/if}
        </div>
    </div>
</div>

{#if request.children != null}
    {#each request.children as child}
        <svelte:self request={child} />
    {/each}
{/if}

{#if request.response != null}
    <ResponseCard request={request} />
{/if}