<script>
  import {Router, Route} from "svelte-navigator";

  import Services from "./pages/Services.svelte";
  import Error404 from "./pages/Error404.svelte";
  import Request from "./pages/Request.svelte";

  export let url = "";
</script>

<Router url={url}>
  <Route path="/" component={Services} />
  <Route path="/services" component={Services} />
  <Route path="/request" component={Request} />
  <Route path="*" component={Error404} />
</Router>