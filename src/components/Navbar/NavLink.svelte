<script>
    import {Link, useLocation} from "svelte-navigator";

    export let name;
    export let path;

    const location = useLocation();

    let className;
    if ($location.pathname === path) {
        className = "inline-flex items-center border-b-2 border-sky-500 px-1 pt-1 text-sm font-medium text-gray-900";
    } else {
        className = "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";
    }
</script>

<Link to={path} class={className}>{name}</Link>