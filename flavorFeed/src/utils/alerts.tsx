export const displayAlertFor5s = (setFunction: (item: boolean) => void) => {
  setFunction(true);
  setTimeout(() => {
    setFunction(false);
  }, 5000);
};
