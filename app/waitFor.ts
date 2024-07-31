function waitFor(delay = 1000) {
  return new Promise((res) => {
    setTimeout(() => res(true), delay);
  });
}

export { waitFor };
