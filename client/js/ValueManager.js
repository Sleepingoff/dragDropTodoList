class ValueManager {
  constructor(targetNode) {
    this.targetNode = targetNode;
    this.targetData = { ...targetNode.dataset };
    this.childInput = this.targetNode.querySelector("input");
    this.input = document.createElement("input");
    this.value = "";
  }
  checkChildInput() {
    return !!this.childInput;
  }
  appendInput() {
    if (this.checkChildInput()) return false;
    this.value = this.targetNode.textContent;
    this.targetNode.textContent = "";
    this.targetNode.appendChild(this.input);
    this.childInput = this.targetNode.querySelector("input");
    this.childInput.value = this.value;
  }
  setInputValue() {
    this.childInput.addEventListener("blur", (event) => {
      this.value = event.target.value;
      this.targetNode.textContent = this.value;
      this.childInput.remove();
    });
  }
  setTargetData() {
    return { ...this.targetData };
  }
}

export default ValueManager;
