<script>
    import Navbar from "../components/Navbar/index.svelte";
    import RequestBuilder from "../components/RequestBuilder.svelte";
    import RequestService from "../services/RequestService.js";
    import Error from "../components/Alerts/Error.svelte";
    import LoadingSpinner from "../components/LoadingSpinner.svelte";
    import RequestCard from "../components/Waterfall/RequestCard.svelte";

    let errors = [];
    let promise;
    let isSending;
    const sendRequest = (request) => {
        errors = RequestService.validate(request);
        if (errors.length === 0) {
            isSending = true;
            promise = RequestService.send(request)
                .finally(() => isSending = false);
        }
    };
</script>

<Navbar/>
<div class="py-8">
    <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-4">
            {#if errors.length > 0}
                <Error title="There was an error when validating the request"
                       description={errors}
                       showButtons={true}
                       dismissable={true}
                       onDismiss={() => errors = []}
                />
            {/if}
            <RequestBuilder onSend={sendRequest} isSending={promise && promise.state } />
            {#if promise != null}
                {#await promise}
                    <LoadingSpinner color="sky-500" />
                {:then response}
                    <div class="mx-auto max-w-7xl pt-4">
                        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Request Waterfall</h1>
                        <p class="mt-1 text-sm text-gray-500">
                            The request took {response.data?.response?.time - response.data?.time}ms to execute in total.
                        </p>
                    </div>
                    <RequestCard request={response.data} />
                {:catch error}
                    <Error title="There was an error when sending the request"
                           description={error.message}
                           showButtons={true}
                           dismissable={true}
                           onDismiss={() => promise = null}
                    />
                {/await}
            {/if}
        </div>
    </main>
</div>