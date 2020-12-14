<template>
    <div class="app-form__wrapper">
        <div v-if="success" class="app-form__success">
            <h3 class="app-form__success-msg">Application successfully created!</h3>
            <div>
                <button @click="restartForm" class="app-form__success-btn">BACK</button>
                <button @click="closeModal" class="app-form__success-btn">DONE</button>
            </div>
        </div>
        <form v-else @submit="handleSubmit" v-bind:class="{'app-form--fixed-preview' : fixedPreview}" class="app-form">
            <div class="app-form__fields">
                <h3 class="app-form__header">Create Your App</h3>

                <FormGroup
                    label="APP NAME"
                    :error="errors.appName"
                >
                    <Input
                        placeholder="Enter App Display Name"
                        type="text"
                        v-model="appName"
                    />
                </FormGroup>

                <FormGroup
                    label="APP ICON"
                    :error="errors.appFile"
                >
                    <InputFile 
                        :onChange="handleFileChange" 
                        accept=".jpg,.jpeg,.png" 
                        id="app-icon"
                        v-model="appFile"
                    />
                </FormGroup>

                <FormGroup
                    label="ICON'S BACKGROUND COLOR"
                    :error="errors.appColor"
                >
                    <ColorPicker v-model="appColor" id="app-color" />
                </FormGroup>

                <FormGroup
                    label="CATEGORY"
                    :error="errors.appCategory"
                >
                    <Select v-model="appCategory" >
                        <option value="">Select</option>
                        <option value="Games">Games</option>
                        <option value="Finance">Finance</option>
                        <option value="Medical">Medical</option>
                        <option value="Music">Music</option>
                        <option value="Education">Education</option>
                    </Select>
                </FormGroup>
            </div>

            <div class="app-form__preview">
                <h3 class="app-form__preview-header">APP'S CARD PREVIEW</h3>
                <AppCard 
                    :name="appName"
                    :category="appCategory"
                    :color="appColor"
                    :icon="appIcon"
                />
                <button type="submit" class="app-form__button">{{sending ? 'SAVING...' : 'SAVE APP'}}</button>
            </div>
        </form>
    </div>
</template>

<script>
import AppCard from './AppCard'
import Input from './Form/Input';
import Select from './Form/Select';
import ColorPicker from './Form/ColorPicker';
import InputFile from './Form/InputFile';
import FormGroup from './Form/FormGroup';

import { post } from '../api';

export default {
    name: 'AppForm',
    data: () => ({
        appName: '',
        appCategory: '',
        appColor: '#e3e3e3',
        appFile: '',
        appIcon: require(`../assets/default-icon.png`),
        errors: {},
        success: false,
        sending: false,
        fixedPreview: false,
    }),
    props: {
        closeModal: Function,
    },
    components: {
        Input,
        Select,
        ColorPicker,
        InputFile,
        FormGroup,
        AppCard
    },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            if (window.innerHeight < 600) {
                this.fixedPreview = true;
            } else {
                this.fixedPreview = false;
            }
        },
        handleFileChange (target) {
            const [ file ] = target.files;
            if (!file) return

            const reader = new FileReader();

            reader.onloadend = () => {
                this.appIcon = reader.result;
            }

            reader.readAsDataURL(file)
        },
        async handleSubmit (e) {
            e.preventDefault();

            this.errors = {};
            if (!this.appName) this.errors.appName = "App Name is required!";
            if (!this.appFile) this.errors.appFile = "App Icon is required!";
            if (!this.appColor) this.errors.appColor = "Icon's Background Color is required!";
            if (!this.appCategory) this.errors.appCategory = "Category is required!";

            const countErrors = Object.keys(this.errors).length;

            if (countErrors > 0) return

            const data = {
                name: this.appName,
                icon: this.appFile,
                color: this.appColor,
                category: this.appCategory
            }

            this.sending = true;
            const response = await post(data);
            this.sending = false;

            this.success = true;
            console.log(response);
        },
        restartForm () {
            this.appName= ''
            this.appCategory= ''
            this.appColor= '#e3e3e3'
            this.appFile= ''
            this.appIcon= require(`../assets/default-icon.png`)
            this.errors= {}
            this.success= false
        }
    }
}
</script>

<style lang="scss" scoped>
    .app-form {
        display: flex;
        flex-direction: column;

        @media (min-width: 1024px) {
            flex-direction: row;
        }

        &--fixed-preview {
            @media (max-width: 1024px) {
                padding-bottom: 230px;
            }
        }

        &__wrapper {
            height: 100%;
            width: 100%;
        }
        
        &__header {
            margin-bottom: 15px;
        }

        &__fields {
            @media (min-width: 1024px) {
                width: 100%;
                padding-right: 60px;
                border-right: 1px solid #ccc;
            }
        }

        &__preview {
            width: 100%;
            margin-top: 20px;
            padding-top: 30px;
            border-top: 1px solid #ccc;
            
            @media (min-width: 1024px) {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                max-width: 300px;
                padding-left: 30px;
                padding-top: 40px;
                margin-top: 0;
                border-top:0;
            }
        }

        &--fixed-preview &__preview {
            @media (max-width: 1024px) {
                position: fixed;
                background: #fafafa;
                left: 0;
                bottom: 0;
                padding: 20px;
                border: 0;
                box-shadow: 1px -3px 21px -10px #000;
            }
        }

        &__preview-header {
            margin-bottom: 10px;
            
            @media (min-width: 1024px) {
                width: 230px;
                font-size: 14px;
            }
        }

        &__button {
            width: 100%;
            padding: 18px 25px;
            margin-top: 20px;

            border: 0;
            border-radius: 4px;
            color: #fff;
            background: #8a8a8a;
            font-weight: bold;
            cursor: pointer;

            @media (min-width: 1024px) {
                padding: 12px 25px;
                margin-top: 40px;
                width: auto;
            }
        }

        &__success {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 350px;
            width: 100%;
            text-align: center;
        }

        &__success-msg {
            font-size: 30px;
            margin-bottom: 20px;
        }

        &__success-btn {
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