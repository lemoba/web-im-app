<template>
    <div id="box">
        <div class="header">快捷登录</div>
        <div class="main">
            <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large" :show-label="false">
                <n-form-item path="mobile">
                    <n-input v-model:value="formValue.mobile" type="text" placeholder="手机号" />
                </n-form-item>
                <n-form-item path="password">
                    <n-input v-model:value="formValue.password" type="password" placeholder="密码" />
                </n-form-item>
                <n-form-item>
                    <n-button @click="handleValidateClick" type="primary" class="submit-btn" :loading="loading">
                        登录
                    </n-button>
                </n-form-item>
                <n-form-item>
                    <div class="links">
                        <span @click="toLink('/auth/forget')"> 忘记密码?</span>
                        <span @click="toLink('/auth/register')">还没有账号？立即注册</span>
                    </div>
                </n-form-item>

            </n-form>
        </div>
        <div class="footer">
            <span class="divider">
                <Icon color="#b1a0a0" size="19">
                    <MobileAlt />
                </Icon>
                <p>预览账号</p>
            </span>
            <span class="preview-account">
                <p>预览账号:18798272054 / 密码: admin123</p>
                <p>预览账号:18798272055 / 密码: admin123</p>
            </span>
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
                mobile: '15549959926',
                password: '1111',
            }),
            rules: {
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