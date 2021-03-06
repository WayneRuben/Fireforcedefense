<template>
    <div id="level-view-sidebar" style="z-index: 100;">
        <div class="d-flex flex-row justify-content-between align-items-center mb-3 row-cols-3">
            <div class="d-flex justify-content-start">
                <div
                    class="bg-light p-2" id="money"
                    @mouseenter="setHelpText('Money: InGame currency for paying protective measures against fire.')"
                    @mouseleave="setHelpText(null)"
                >
                    {{totalMoney}} <img src="/assets/utilities-Coin.svg" style="height: 1em;" alt="Coins"/>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <button
                    @click="activateEmergencyRelief"
                    :disabled="reliefGotActivated"
                    class="btn btn-card"
                    id="rain-emergency-relief"
                    @mouseenter="setHelpText('Relief: Causes the clouds to give the complete level a rain shower. It\'s only one time use per level.')"
                    @mouseleave="setHelpText(null)"
                >
                    <img src="/assets/utilities-Nothilfe.svg" style="height: 3em;" alt="Rain"/>
                </button>
            </div>

            <div class="d-flex justify-content-end">
                <button
                    class="btn btn-light"
                    data-toggle="modal"
                    v-bind:data-target="'#' + modalId"
                    @mouseenter="setHelpText('Menu: Pauses the level and gives options to resume, to restart and to go back to the level selection.')"
                    @mouseleave="setHelpText(null)"
                >
                    <img src="/assets/utilities-menu_bttn.svg" style="height: 1em;" alt="Menu">
                </button>
            </div>
        </div>
        <div class="card my-2">
            <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                    <h2 class="card-title h5">{{ $t('building menu')}}</h2>
                    <button
                        class="small-menu-card btn btn-card"
                        @click.stop="$emit('remove-selected')"
                        @mouseenter="setHelpText('Remove: Removes an selected object on a cell to enable building a building and other fire fighting units.')"
                        @mouseleave="setHelpText(null)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                            <rect v-bind:fill="'url(#utility-Abbauen)'" height="100" width="100" x="0" y="0" />
                        </svg>
                    </button>
                </div>
                <div class="build-menu-cards">
                    <button
                        v-for="content in buildableContents"
                        class="build-menu-card btn btn-card"
                        @click.stop="$emit('content-selected', content)"
                        @mouseenter="setHelpText(new content().description)"
                        @mouseleave="setHelpText(null)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" class="p-1">
                            <rect v-bind:fill="'url(#content-' + new content().id + ')'" height="100" width="100" x="0" y="0" />
                        </svg>
                        <span class="d-flex justify-content-end mt-1">
                            <span class="build-costs">{{ new content().buildCosts }}</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="card my-2" id="help">
            <div class="card-body">
                <h2 class="card-title h5">{{ $t('help') }}</h2>
                <p v-for="helpText in helpTexts" class="card-text">
                    {{ $t(helpText) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {
            activateEmergencyRelief: function () {
                this.$emit('relief-clicked');
            },
            setHelpText(text: string|null) {
                this.$emit('set-help-text', text);
            },
        },
        components: {},
        props: ['buildableContents', 'reliefGotActivated', 'helpTexts', 'totalMoney', 'debugMode', 'modalId']
    })
</script>
