export default class UserInfo {
  constructor(userNameSelector, userJobSelector, avatarPicture) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
    this._avatarPicture = document.querySelector(avatarPicture);
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

  setAvatar(data) {
    this._avatarPicture.src = data;
  }
}
