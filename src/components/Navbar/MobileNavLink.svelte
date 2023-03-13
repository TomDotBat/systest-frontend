<script>
    import {Link, useLocation} from "svelte-navigator";

    export let name;
    export let path;

    const location = useLocation();

    let className;
    if ($location.pathname === path) {
        className = "block border-l-4 border-sky-500 bg-sky-50 py-2 pl-3 pr-4 text-base font-medium text-sky-700";
    } else {
        className = "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700";
    }
</script>

<Link to={path} class={className}>{name}</Link>