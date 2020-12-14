<template>
    <div class="form-group">
        <label class="form-group__label">{{label}}</label>
        <slot />
        <InputError :message="error" />
    </div>
</template>

<script>
import InputError from './InputError';

export default {
    name: 'FormGroup',
    props: {
        label: String,
        error: String
    },
    components: {
        InputError
    }
}
</script>

<style lang="scss">
    .form-group {
        display: block;
        margin-bottom: 20px;
        
        &__label {
            display: block;
            margin-bottom: 5px;
        }
    }

</style>