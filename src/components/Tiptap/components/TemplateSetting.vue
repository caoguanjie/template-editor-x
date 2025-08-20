<template>
    <div class="template-setting">
        <el-form :model="templateSetting" label-width="76px" :require-asterisk-position="'right'" :rules>
            <el-form-item label="文书名称" prop="templateName" class="templateName" required>
                <el-input v-model="templateSetting.templateName" />
            </el-form-item>
            <div class="form_content-spliter "></div>
            <el-form-item label="页面尺寸" prop="pageSize" required>
                <el-select v-model="templateSetting.pageSize">
                    <el-option v-for="item in ['A4', 'A5']" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="页面方向" prop="pageOrientation" required>
                <el-select v-model="templateSetting.pageOrientation">
                    <el-option v-for="item in [1, 2]" :key="item" :label="item === 1 ? '竖向' : '横向'" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="上边距" prop="pageSizeReduce.top" required>
                <el-input v-model="templateSetting.pageSizeReduce.top" type="text" maxlength="2"
                    @keydown="keydownNumber">
                    <template #append>mm</template>
                </el-input>
            </el-form-item>
            <el-form-item label="下边距" prop="pageSizeReduce.bottom" required>
                <el-input v-model="templateSetting.pageSizeReduce.bottom" type="text" maxlength="2"
                    @keydown="keydownNumber">
                    <template #append>mm</template>
                </el-input>
            </el-form-item>
            <el-form-item label="左边距" prop="pageSizeReduce.left" required>
                <el-input v-model="templateSetting.pageSizeReduce.left" type="text" maxlength="2"
                    @keydown="keydownNumber">
                    <template #append>mm</template>
                </el-input>
            </el-form-item>
            <el-form-item label="右边距" prop="pageSizeReduce.right" required>
                <el-input v-model="templateSetting.pageSizeReduce.right" type="text" maxlength="2"
                    @keydown="keydownNumber">
                    <template #append>mm</template>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts' setup>
import { FormRules } from 'element-plus';
import { TemplateSetting } from '../type';
import { keydownNumber } from '../utils/function'
// 模板设置
const templateSetting = defineModel<TemplateSetting>({
    default: () => new TemplateSetting(),
});

// 模板设置的规则
const rules = reactive<FormRules<TemplateSetting>>({
    templateName: [{ required: true, message: '文书名称不能为空', trigger: 'blur' }],
    pageSize: [{ required: true, message: '页面尺寸不能为空', trigger: 'blur' }],
    pageOrientation: [{ required: true, message: '页面方向不能为空', trigger: 'blur' }],
    "pageSizeReduce.top": [{ required: true, message: '上边距不能为空', trigger: 'blur' }, { type: 'number', message: '上边距必须为数字值', trigger: 'change' },],
    "pageSizeReduce.bottom": [{ required: true, message: '下边距不能为空', trigger: 'blur' }],
    "pageSizeReduce.left": [{ required: true, message: '左边距不能为空', trigger: 'blur' }],
    "pageSizeReduce.right": [{ required: true, message: '右边距不能为空', trigger: 'blur' }],
})

</script>
<style lang='scss' scoped>
.template-setting {
    height: 100%;
    overflow-y: auto;
    overflow-y: overlay;
    padding: 16px;
    box-sizing: border-box;
}

.templateName {
    margin-bottom: 18px;
}

:deep(.el-form-item__label) {
    font-size: 14px;
    color: #7a8794;
    white-space: nowrap;
    padding-right: 0;
    justify-content: flex-start
}

:deep(.el-input-group__append) {
    padding: 0 8px;
    background-color: #f5f7fb;
    color: #000;
    min-width: 25px;
}

:deep(.el-select__wrapper),
:deep(.el-input__wrapper) {
    --el-input-border-color: #e0e5ee;

    &:hover {
        box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
    }
}

.form_content-spliter {
    background: #e6eaee;
    height: 1px;
    margin-bottom: 18px;
}
</style>