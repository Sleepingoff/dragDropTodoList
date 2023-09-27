class Status {
  constructor(status) {
    this.status = status;
  }
  createStatus() {
    const li = document.createElement("li");
    li.innerHTML = `<button>${this.status}</button>`;
    return li;
  }
}

export default Status;
