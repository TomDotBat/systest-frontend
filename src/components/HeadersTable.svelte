<script>
    export let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
    export let readOnly;

    let editing;
    let addName;
    let addValue;

    const addHeader = () => {
        headers[addName] = addValue;
        addName = "";
        addValue = "";
    }

    const removeHeader = (name) => {
        delete headers[name];
        headers = headers;
    }
</script>

<table class="min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
        <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Name
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Value
            </th>
            {#if !readOnly}
                <th scope="col" class="float-right relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <button on:click={() => editing = !editing} type="button" class="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:mt-0 sm:w-auto">
                        {editing ? "Save" : "Edit"}
                    </button>
                </th>
            {/if}
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
        {#each Object.keys(headers) as name}
            <tr>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {name}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {headers[name]}
                </td>
                {#if editing}
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" on:click={() => removeHeader(name)} class="text-sky-600 hover:text-sky-900">
                            Remove
                        </a>
                    </td>
                {/if}
            </tr>
        {/each}
        {#if editing}
            <tr>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                    <input bind:value={addName} type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" />
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                    <input bind:value={addValue} type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" />
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button on:click={() => addHeader()} type="button" class="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:mt-0 sm:w-auto">
                        Add
                    </button>
                </td>
            </tr>
        {/if}
    </tbody>
</table>