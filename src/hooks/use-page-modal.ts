import { ref } from "vue";
type CallbackFn = (item?: any) => void;
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref();
  const defaultInfo = ref({});
  const handleNewData = () => {
    defaultInfo.value = {};
    pageModalRef.value.dialogVisible = true;
    newCb && newCb();
  };
  const hanleEditData = (item: any) => {
    defaultInfo.value = { ...item };
    pageModalRef.value.dialogVisible = true;

    editCb && editCb(item);
  };
  return { pageModalRef, defaultInfo, handleNewData, hanleEditData };
}
