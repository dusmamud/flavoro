<!-- Decorative photographic basil-leaf cutout (transparent PNG, cut from the
     footer food photo — real basil, not a flat SVG shape). `variant` picks
     one of the three sprigs; `class` carries size/position/rotation/float
     animation from the caller. `object-contain` keeps each sprig's own
     aspect ratio inside the square box instead of stretching it. -->
<script lang="ts">
	let { class: cls = 'h-10 w-10', variant = 1 }: { class?: string; variant?: 1 | 2 | 3 } = $props();
</script>

<img
	src="/images/leaf-{variant}.png"
	alt=""
	aria-hidden="true"
	draggable="false"
	class="{cls} object-contain"
/>
