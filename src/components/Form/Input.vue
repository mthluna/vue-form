<template>
    <input 
        :placeholder="placeholder" 
        :type="type" 
        class="form-control" 
        :value="value" @input="$emit('input', $event.target.value)"
    />
</template>

<script>
export default {
    name: 'Input',
    props: ['placeholder', 'type', 'value'],
}
</script>

<style lang="scss">
    .form-control {
        display: block;
        width: 100%;
        max-width: 100%;
        padding: 10px 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-weight: bold;
        color: #777;

        &::placeholder {
            font-weight: bold;
            color: #d2d2d2;
        }
    }
</style>