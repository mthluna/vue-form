<template>
    <label tabindex="0" @keyup.enter="handleKeyUp" :for="id" class="color-picker">
        <span class="color-picker__text">Pick a color</span>
        <div v-bind:style="{'background-color': value}" class="color-picker__color-field">
            <input
                ref="input"
                class="color-picker__input" 
                :id="id" 
                type="color" 
                :value="value" 
                @input="$emit('input', $event.target.value)"
            />
            <span class="color-picker__color">{{value}}</span>
        </div>
    </label>
</template>

<script>
export default {
    name: 'ColorPicker',
    props: {
        value: String,
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        handleKeyUp () {
            const input = this.$refs.input;
            input.click();
        }
    }
}
</script>

<style lang="scss" scoped>
    .color-picker {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        max-width: 100%;
        padding-left: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-weight: bold;
        color: #d2d2d2;
        overflow: hidden;
        cursor: pointer;

        &__text {
            width: 100%;
            font-size: 13px;
        }

        &__color {
            text-shadow: 0px 0px 3px rgb(0 0 0 / 0.5);
        }

        &__input {
            visibility: hidden;
            position: absolute;
        }

        &__color-field {
            display: flex;
            align-items: center;
            padding: 0 20px;
            position: relative;
            height: 100%;
            background: #000;
            color: #fff;
        }
    }
</style>