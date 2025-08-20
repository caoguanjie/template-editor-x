// 设备类别关联项目

import { useRequest, EquipMentTypeItemList, SaveEquipMentTypeItemInput } from "@/services";


/**
 * 接口名称：查看设备类别项目数据
 * @returns 
 */
export function fetchEquipmentTypeItemList() {
    return useRequest((EquiType: string) =>
        sysApis.TreatEquipMent.get_treatequipment_getequipmenttypeitemlist({
            params: {
                EquiType: EquiType
            },
            transform: (res) => {
                const { data, isSuccess } = res as Service.ResponseResult<EquipMentTypeItemList>
                if (isSuccess) {
                    return new EquipMentTypeItemList(data)
                }
            }
        }), {
        immediate: false
    })
}



/**
 * 接口名称：保存设备类别关联项目
 * @returns 
 */
export function fetchSaveEquipMentTypeItem() {
    return useRequest((data: SaveEquipMentTypeItemInput) =>
        sysApis.TreatEquipMent.post_treatequipment_saveequipmenttypeitem({
            data,
            meta: {
                // openSuccessTips: true
            }
        }), {
        immediate: false
    })
}


