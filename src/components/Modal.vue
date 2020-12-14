<template>
    <div v-if="show" class="modal">
        <div class="modal__dialog">
            <button @click="showConfirm" class="modal__close" />
            <div v-show="confirm" class="modal__confirm">
                <h3 class="modal__message">Are you sure you want to close?</h3>
                <p class="modal__confirm-paragraph">All changes will be discarded</p>
                <div>
                    <button @click="showContent" class="modal__button">NO</button>
                    <button @click="confirmClose" class="modal__button">YES</button>
                </div>
            </div>

            <div v-show="!confirm">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    data: () => ({
        confirm: false,
    }),
    props: {
        show: Boolean,
        close: Function,
    },
    methods: {
        showConfirm () {
            this.confirm = true;
        },
        showContent () {
            this.confirm = false;
        },
        confirmClose () {
            this.confirm = false;
            this.close();
        }
    }
}
</script>

<style lang="scss" scoped>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,.5);

        @media (min-width: 1024px) {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__dialog {
            position: relative;
            max-width: 100%;
            height: 100%;
            padding: 30px 20px;
            background: #fafafa;
            overflow-y: auto;

            @media (min-width: 1024px) {
                max-width: 800px;
                width: 100%;
                max-height: calc(100% - 20px);
                height: auto;
                padding: 30px;
                border-radius: 5px;
            }
        }

        &__close {
            position: absolute;
            right: 15px;
            top: 5px;
            height: 25px;
            width: 25px;
            padding: 0;
            background-color: transparent;
            border: 0;
            cursor: pointer;

            @media (min-width: 1024px) {
                top: 10px;
                height: 15px;
                width: 15px;
            }

            &:before, 
            &:after {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 3px;
                background: #000;
            }

            &:after {
                transform: rotate(45deg);
                left: 0;
            }

            &:before {
                transform: rotate(-45deg);
                right: 0;
            }
        }

         &__confirm {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 350px;
            width: 100%;
            text-align: center;
        }

        &__message {
            font-size: 30px;
        }

        &__confirm-paragraph {
            margin-bottom: 20px;
        }

        &__button {
            margin-right: 10px;
            padding: 12px 25px;
            border: 0;
            border-radius: 4px;
            color: #fff;
            background: #8a8a8a;
            font-weight: bold;
            cursor: pointer;
        }
    }
</style>