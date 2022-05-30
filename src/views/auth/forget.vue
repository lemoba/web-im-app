<template>
    <div id="box">
        <div class="header">重置密码</div>
        <div class="main">
            <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large" :show-label="false">

                <n-form-item path="mobile">
                    <n-input v-model:value="formValue.mobile" type="text" placeholder="手机号" />
                </n-form-item>
                <n-form-item path="msgCode" class="msgCode">
                    <div>
                        <n-input v-model:value="formValue.msgCode" type="text" placeholder="短信验证码" />
                    </div>

                    <n-button>获取短信</n-button>
                </n-form-item>
                <n-form-item path="password">
                    <n-input v-model:value="formValue.password" type="password" placeholder="密码" />
                </n-form-item>
                <n-form-item>
                    <n-button @click="handleValidateClick" type="primary" class="submit-btn" :loading="loading">
                        立即重置
                    </n-button>
                </n-form-item>
                <n-form-item>
                    <div class="links">
                        <span @click="toLink('/auth/register')">注册账号</span>
                        <span @click="toLink('/auth/login')">已有账号？立即登录</span>
                    </div>
                </n-form-item>
            </n-form>
        </div>
    </div>
</template>
<script lang="ts">

import { reactive, ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@vicons/utils'
import { MobileAlt } from '@vicons/fa'
import { FormInst, useMessage, FormItemRule } from 'naive-ui'

export default defineComponent({
    components: {
        Icon,
        MobileAlt
    },
    setup() {
        const router = useRouter()
        const msg = useMessage()
        const loadingRef = ref(false)

        const toLink = (path: string) => {
            router.push(path)
        }

        const formRef = ref<FormInst | null>(null)
        return {
            formRef,
            toLink,
            formValue: ref({
                mobile: '',
                password: '',
                msgCode: '',
            }),
            rules: {
                msgCode: {
                    required: true,
                    message: '请输入验证码',
                    trigger: ['blur']
                },
                mobile: {
                    required: true,
                    validator(rule: FormItemRule, value: string) {
                        if (!value) {
                            return new Error('请输入手机号')
                        }
                        if (value.length != 11) {
                            return new Error('手机号格式不正确')
                        }
                        return true
                    },
                    trigger: ['blur']
                },
                password: {
                    required: true,
                    message: '请输入密码',
                    trigger: ['blur']
                },
            },
            handleValidateClick(e: MouseEvent) {
                loadingRef.value = true
                setTimeout(() => {
                    loadingRef.value = false
                }, 1000)
                e.preventDefault()
                formRef.value?.validate((errors) => {
                    if (!errors) {
                        msg.error('密码错误')
                    } else {
                        console.log(errors)
                    }
                })
            },
            loading: loadingRef
        }
    }
})

</script>
<style scope lang="less">
@import '@/assets/css/auth.less';
</style>