<template>
    <select 
        :value="value" 
        @change="$emit('input', $event.target.value);"
        class="form-control"
    >
        <slot />
    </select>
</template>

<script>
export default {
    name: 'Select',
    props: ['value'],
}
</script>