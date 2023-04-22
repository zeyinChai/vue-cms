import { ref } from "vue";
export function usePageSearch() {
  const pageContentRef = ref();
  const handleResetClick = () => {
    pageContentRef.value.getPageData();
  };
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value.getPageData(queryInfo);
  };
  return { pageContentRef, handleQueryClick, handleResetClick };
}
