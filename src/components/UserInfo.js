export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userInput = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInput;
  }

  setUserInfo(data) {
    this._name.textContent = data.title;
    this._job.textContent = data.description;
  }
}
