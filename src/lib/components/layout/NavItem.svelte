<script lang="ts">
  export let href: string;
  export let target: "_self" | "_blank" = "_self";
</script>

<a
  {href}
  {target}
  class="no-underline text-inherit p-2 rounded-lg text-white hover:bg-gray-600 h-8"
  ><slot /></a
>
