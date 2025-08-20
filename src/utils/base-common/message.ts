import { ElMessage } from 'element-plus';

export const toast = {
  err: (text: string) => {
    return ElMessage({
      message: text.replace(/"/g, ""),
      type: "error",
      grouping: true,
    })
  },
  info: (text: string) => {
    return ElMessage({
      message: text.replace(/"/g, ""),
      type: "info",
      grouping: true,
    })
  },
  warn: (text: string) => {
    return ElMessage({
      message: text.replace(/"/g, ""),
      type: "warning",
      grouping: true,
    })
  },
  success: (text: string) => {
    return ElMessage({
      message: text.replace(/"/g, ""),
      type: "success",
      grouping: true,
    })
  },
} 