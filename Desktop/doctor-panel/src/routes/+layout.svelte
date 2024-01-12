<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";
  import Header from "./dashboard/Header.svelte";
  import "../app.postcss";

  export let data: PageData;
  $: ({ supabase, session } = data);

  onMount(() => {
    // supabaseStore.set(supabase);
    supabase.auth.getUser().then((user) => {
      if (!user) {
        invalidate("supabase:auth");
      }
    });
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<div class="alerts" />
<slot />
