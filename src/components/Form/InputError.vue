<template>
    <p class="input-error">{{message}}</p>
</template>

<script>
export default {
    name: 'InputError',
    props: {
        message: String
    }
}
</script>

<style lang="scss">
    .input-error {
        margin-top: 5px;
        color: #c54a4a;
        font-size: 11px;
    }
</style>