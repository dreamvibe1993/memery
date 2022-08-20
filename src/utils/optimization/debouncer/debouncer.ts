const DELAY_MS = 100;

function debounceCached() {
  var timeoutId: ReturnType<typeof setTimeout>;
  return function debounce(fn: () => any): any {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      return fn();
    }, DELAY_MS);
  };
}

const debounce = debounceCached();

export default debounce;
