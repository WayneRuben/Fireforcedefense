<template>
    <div id="level-end-screen" class="modal" ref="level-end-screen" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 v-if="score === Score.UNLOCKED" class="modal-title h5">{{ $t('lost') }}</h2>
                    <h2 v-else class="modal-title h5">{{ $t('victory')}}</h2>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <img
                            v-bind:src="'/assets/levelend_stars_' + stars + '.svg'"
                            v-bind:alt="stars + ' Sterne'"
                            style="height: 5.5rem;"
                            class="mb-3"
                        />
                    </div>
                    <button
                        v-if="score !== Score.UNLOCKED && nextLevel !== null"
                        class="btn btn-primary btn-block btn-lg mb-3"
                        data-toggle="modal"
                        @click="$emit('next')"
                        aria-label="Close"
                        data-dismiss="modal"
                    >
                        {{ $t('next level') }}
                    </button>
                    <button
                        class="btn btn-primary btn-block"
                        v-bind:class="{'btn-lg': score === Score.UNLOCKED}"
                        data-toggle="modal"
                        @click="$emit('restart')"
                        aria-label="Close"
                        data-dismiss="modal"
                    >
                        {{ $t('new start') }}
                    </button>
                    <hr class="my-3" />
                    <button class="btn btn-primary btn-block btn-lg" @click="back" data-dismiss="modal">
                        {{ $t('back to level selection') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import Score from '../model/Score';
    import $ from 'jquery';


    export default Vue.extend({
        data() {
            return {
                Score
            }
        },
        methods: {
            back: function () {
                this.$router.push('/world');
            },
        },
        components: {},
        computed: {
            stars: function () {
                switch (this.score) {
                    case Score.UNLOCKED: return 0;
                    case Score.ONE_STAR: return 1;
                    case Score.TWO_STARS: return 2;
                    case Score.THREE_STARS: return 3;
                    default: return 0;
                }
            },
        },
        watch: {
            score: function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                if (newValue === null) {
                    $('#level-end-screen').modal('hide');
                } else {
                    $('#level-end-screen').modal('show');
                }
            }
        },
        props: ['score', 'nextLevel']
    })
</script>
