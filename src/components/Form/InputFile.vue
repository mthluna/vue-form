<template>
    <label
        @dragover="dragover"
        @dragleave="dragleave" 
        @drop="drop"
        @keyup.enter="handleKeyUp" 
        tabindex="0" 
        :for="id" 
        class="input-file"
    >
        <span class="input-file__text"></span>
        <div :title="name" class="input-file__field">
            <span class="input-file__name">
                {{name}}
            </span>
            <input 
                ref="input"
                class="input-file__input" 
                :id="id" 
                type="file" 
                :value="value" 
                @change="handleChange"
            />
        </div>
    </label>
</template>

<script>
export default {
    name: 'InputFile',
    props: {
        value: String,
        accept: String,
        id: {
            type: String,
            required: true
        },
        onChange: Function
    },
    data: () => ({
        name: 'SELECT A FILE'
    }),
    methods: {
        dragover(event) {
            event.preventDefault();
            if (!event.currentTarget.classList.contains('input-file--bg-drag')) {
                event.currentTarget.classList.add('input-file--bg-drag');
            }
        },
        dragleave(event) {
            event.currentTarget.classList.remove('input-file--bg-drag');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.input.files = event.dataTransfer.files;

            this.handleChange();

            event.currentTarget.classList.remove('input-file--bg-drag');
        },
        handleChange () {
            this.$emit('input', this.$refs.input.value)
            this.onChange && this.onChange(this.$refs.input);

            const [ file ] = this.$refs.input.files;
            if (!file) return;
            
            this.name = file.name;
        },
        handleKeyUp () {
            const input = this.$refs.input;
            input.click();
        }
    }
}
</script>

<style lang="scss" scoped>
    .input-file {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        max-width: 100%;
        font-weight: bold;
        color: #d2d2d2;
        overflow: hidden;
        cursor: pointer;

        @media (min-width: 1024px) {
            height: 60px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        &--bg-drag {
            background-color: #f5f4e5;
        }

        &__text {
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;
            padding: 0 12px;
            margin-right: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 13px;

            @media (min-width: 1024px) {
                padding-left: 0;
                border: 0;
                font-size: 11px;
            }

            &:before {
                content: "Select a file";

                @media (min-width: 1024px) {
                    content: "Drag an image here to upload"
                }
            }
        }

        &__input {
            visibility: hidden;
            position: absolute;;
        }

        &__field {
            position: relative;
            padding: 0 25px;
            height: 100%;
            width: 100%;
            max-width: 150px;
            display: flex;
            align-items: center;
            border: 0;
            border-radius: 4px;
            color: #fff;
            background: #8a8a8a;
            font-weight: bold;
            font-size: 13px;
            cursor: pointer;
        }

        &__name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            width: 100%;
        }
    }
</style>