<template>
    <div class="app-card">
        <div v-bind:style="{'background-color': color}" class="app-card__img-box">
            <img 
                :src="icon" 
                :alt="name" 
                class="app-card__img" 
            />
        </div>
        <div class="app-card__content">
            <h3 class="app-card__name">{{name || 'App Name'}}</h3>
            <p class="app-card__category">{{category || 'App Category'}}</p>
            <p class="app-card__text">New App</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppCard',
    props: {
        name: String,
        category: String,
        color: String,
        icon: String,
    }
}
</script>

<style lang="scss" scoped>
    .app-card {
        display: flex;
        width: 100%;
        border-radius: 3px;
        box-shadow: 2px 3px 10px -7px #000;
        overflow: hidden;

        @media (min-width: 1024px) {
            max-width: 230px;
            flex-direction: column;
        }

        &__img-box {
            height: auto;
            width: 100%;
            max-width: 110px;
            display: flex;
            align-items: center;
            justify-content: center;

            @media (min-width: 1024px) {
                max-width: 100%;
                padding: 30px;
            }
        }

        &__img {
            max-width: 100%;
            height: 70px;
            width: auto;

            @media (min-width: 1024px) {
                height: 100px;
            }
        }

        &__content {
            padding: 20px 10px;
            width: 100%;
            background: #fff;
        }

        &__name {
            margin-bottom: 10px;
        }

        &__text {
            margin-top: 15px;
            font-size: 10px;
            font-weight: bold;
        }
    }
</style>