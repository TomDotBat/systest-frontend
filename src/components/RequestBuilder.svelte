<script context="module">
    import RequestMethod from "../models/RequestMethod.js";
    const requestMethods = Object.keys(RequestMethod);
</script>

<script>
    import SelectMenu from "./SelectMenu.svelte";
    import {JSONEditor} from "svelte-jsoneditor";
    import HeadersTable from "./HeadersTable.svelte";
    import ApplicationService from "../services/ApplicationService.js";
    import LoadingSpinner from "./LoadingSpinner.svelte";

    export let onSend;
    export let isSending;

    let serviceIndex = -1;
    let services;

    let getAllServicesPromise = ApplicationService.getAll()
        .then((svcs) => services = svcs);

    let instanceIndex;
    let methodIndex;
    let path;
    let headers;
    let body;

    const sendRequest = () => onSend({
        app: services[serviceIndex]?.name,
        instanceId: services[serviceIndex]?.instances[instanceIndex]?.instanceId,
        method: requestMethods[methodIndex],
        path: path,
        headers: headers,
        body: body.text
    });
</script>

<div class="mx-auto max-w-none">
    <div class="bg-white sm:rounded-lg sm:shadow">
        <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div class="ml-4 mt-2">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                        Request Builder
                    </h3>
                </div>
            </div>
        </div>
        <ul class="divide-y divide-gray-200">
            <li>
                <div class="px-4 py-4 sm:px-6">
                    <div class="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Service</label>
                            <div class="mt-2">
                                {#await getAllServicesPromise}
                                    <LoadingSpinner color="sky-500" />
                                {:then services}
                                    <SelectMenu items={services.map((service) => service.name)} bind:selection={serviceIndex} />
                                {:catch error}
                                    <div class="w-60 relative">
                                        <button type="button" disabled class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6">
                                            Failed to fetch services
                                        </button>
                                    </div>
                                {/await}
                            </div>
                        </div>
                        <div class="sm:col-span-4">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Instance</label>
                            <div class="mt-2">
                                {#if serviceIndex > -1}
                                    <SelectMenu items={services[serviceIndex].instances.map((instance) => instance.instanceId ?? instance.hostName)}
                                                bind:selection={instanceIndex} />
                                {:else}
                                    <div class="w-60 relative">
                                        <button type="button" disabled class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6">
                                            Select a service
                                        </button>
                                    </div>
                                {/if}
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Method</label>
                            <div class="mt-2">
                                <SelectMenu items={requestMethods} bind:selection={methodIndex} />
                            </div>
                        </div>
                        <div class="sm:col-span-4">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Path</label>
                            <div class="mt-2 flex">
                                <input bind:value={path} type="text" placeholder="/users" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" />
                                {#if isSending}
                                    <LoadingSpinner color="sky-500" />
                                {:else}
                                    <button on:click={sendRequest} type="button" class="rounded-md bg-sky-600 ml-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:mt-0 sm:w-auto">
                                        Send
                                    </button>
                                {/if}
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Headers</label>
                            <div class="mt-2 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <HeadersTable bind:headers={headers}/>
                            </div>
                        </div>
                        <div class="sm:col-span-4">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Body</label>
                            <div class="mt-2">
                                <JSONEditor bind:content={body} mode="text" navigationBar={false} mainMenuBar={false}/>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>