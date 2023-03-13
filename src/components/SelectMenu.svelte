<script>
    export let items = [];
    export let placeholder = -1;
    export let selection;

    let expanded = false;
    const onItemClick = (idx) => {
        selection = idx;
        expanded = false;
    };
</script>

<div class="w-60 relative">
    <button on:click={() => expanded = !expanded} type="button"
            class="cursor-pointer relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
            aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
        <span class="block truncate">
            {items[selection == null ? placeholder : selection] || "Select an option"}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>
    {#if expanded}
        <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant={`listbox-option-${selection}`}>
            {#each items as item, index}
                <li on:click={() => onItemClick(index)}
                    class={`group/item hover:bg-sky-600 hover:text-white text-gray-900 relative py-2 pl-3 pr-9 select-none ${selection === index ? "cursor-default" : "cursor-pointer"}`}
                    id={`listbox-option-${index}`} role="option">
                <span class={`${selection === index ? "font-semibold" : "font-normal"} block truncate`}>
                    {items[index]}
                </span>
                    {#if selection === index}
                        <span class="text-sky-600 group-hover/item:text-white absolute inset-y-0 right-0 flex items-center pr-4">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </span>
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</div>