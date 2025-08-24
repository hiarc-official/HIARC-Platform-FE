export function useStudyCreatePageState() {
  const handleBackClick = (): void => {
    window.history.back();
  };

  return {
    handleBackClick,
  };
}