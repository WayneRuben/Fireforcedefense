<template>
    <g
        v-bind:transform="'translate(' + x + ',' + y + ')'"
        @click.stop="click"
        @mouseenter="$emit('mouseenter-cell')"
        @mouseleave="$emit('mouseleave-cell')"
    >
        <polygon
            v-bind:points="pathString"
            v-bind:fill="'url(#cell-' + cell.id + ')'"
            stroke="#000"
        />
        <rect
            v-if="cell.content !== null"
            v-bind:fill="'url(#content-' + cell.content.id + ')'"
            v-bind:width="sizeRect" v-bind:height="sizeRect"
            v-bind:x="-halfSizeRect" v-bind:y="-halfSizeRect"
        />
        <g v-if="cell.content !== null && cell.content.damage !== 0 && cell.content.damageMax < +Infinity">
            <rect
                v-bind:x="-size * 0.5" v-bind:y="-size * 0.65" v-bind:width="size" v-bind:height="size * 0.1"
                class="damage-bad"
            />
            <rect
                v-bind:x="-size * 0.5" v-bind:y="-size * 0.65" v-bind:height="size * 0.1"
                v-bind:width="size * (cell.content.damageMax - cell.content.damage) / cell.content.damageMax"
                class="damage-good"
            />
        </g>
        <rect
            v-if="visualFireIntensity !== 0"
            v-bind:fill="'url(#fire-' + visualFireIntensity + ')'"
            v-bind:width="sizeRect" v-bind:height="sizeRect"
            v-bind:x="-halfSizeRect" v-bind:y="-halfSizeRect"
        />
        <polygon v-bind:points="pathString" v-if="disabled" fill="#000" fill-opacity=".5" />
        <text v-if="debugMode" text-anchor="middle" dominant-baseline="middle" class="level-debug-text">
            {{ cell.position }}
        </text>
    </g>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Fire from '../model/Fire';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {
            click: function () {
                this.$emit('cell-clicked', this.cell.position);
            },
        },
        components: {},
        computed: {
            pathString: function () {
                return this.cell.position.getPathString(this.size);
            },
            x: function () {
                return this.cell.position.getCenterX(this.size);
            },
            y: function () {
                return this.cell.position.getCenterY(this.size);
            },
            sizeRect: function() {
                return 1.224744871 * this.size; // sqrt(6)/2 * size
            },
            halfSizeRect: function () {
                return 0.6123724357 * this.size // sqrt(6)/4 * size
            },
            visualFireIntensity: function () {
                return Fire.intensityToFireCategory(this.cell.fireIntensity);
            }
        },
        props: ['cell', 'size', 'disabled', 'debugMode']
    })
</script>
