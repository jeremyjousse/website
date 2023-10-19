<script lang="ts">
  export let href: string;
  export let target: "_self" | "_blank" = "_self";
  export let id: string | undefined = undefined;
</script>

<a
  {href}
  {target}
  {id}
  class=" rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
>
  <slot />
</a>
