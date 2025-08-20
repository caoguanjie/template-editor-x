import { isCacheRoute } from '../is';

export const useKeepAliveHooks = (onMountedFunc: any): any => {

  if (isCacheRoute()) {
    onActivated(onMountedFunc);
  } else {
    onMounted(onMountedFunc);
  }
}