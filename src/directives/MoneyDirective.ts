export default function MoneyDirective() {
  return {
    inserted(el: HTMLElement, binding: { value: number }) {
      const amount = parseFloat(el.innerHTML)
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+,)/g, "$1.");
      el.innerHTML = `${binding.value} ${amount}`;
    },
  };
}
