<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <div class="text-danger" v-if="requiredMessage">{{ $t('Please enter nickname') }}</div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label for="nickname" class="input-group-text">{{ $t('Nickname') }}</label>
                </div>
                <input id="nickname" v-on:keyup.enter="setNickname" class="form-control" v-model="nickname" />
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary btn-block btn-lg" @click="setNickname">{{ $t('log in') }}</button>
            </div>
            <hr class="mb-3" />
            <div>
                <router-link class="btn btn-primary btn-block btn-lg" to="/credits">{{ $t('Credits') }}</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import User from '../model/User';
    import logo from './logo.vue';

    export default Vue.extend({
        data() {
            return {
                nickname: '',
                requiredMessage: false,
            }
        },
        methods: {
            setNickname: function () {
                if (this.nickname !== '') {
                    const user = User.getInstance();
                    user.login(this.nickname);
                    this.$router.push('/world');
                } else {
                    this.requiredMessage = true;
                }
            }
        },
        components: {
            logo,
        },
    })
</script>
