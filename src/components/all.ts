

// import { FitsTable } from './Table/FitsTable'
// export * from './Table/FitsTable'
import type { App } from "vue"

export const FitsComponents = [
    // FitsTable,

]
export function install(app: App) {
    FitsComponents.forEach((component: any) => component.install(app));
}