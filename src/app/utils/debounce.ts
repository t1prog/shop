const debounce = <T extends (...args: readonly unknown[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounceFunction = (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), delay);
  };

  return debounceFunction;
};

export default debounce;
