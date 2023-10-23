export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userInput = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
    return userInput;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.job;
  }
}
