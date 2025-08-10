class ApiUrl {
  static #BASE_URL = "https://api.themoviedb.org/3";

  static get BASE_URL() {
    return this.#BASE_URL;
  }
}

export default ApiUrl