class BaseApiService {
  private baseUrl = "https://api.openweathermap.org/data/2.5";
  private baseUrlV3 = "https://api.openweathermap.org/data/3.0/";
  private apiKey = "86fb8b896f963ca811431cd7525cff90";

  getUrl() {
    return `${this.baseUrl}`;
  }

  getUrlV3() {
    return `${this.baseUrlV3}`;
  }

  getApiKey() {
    return `${this.apiKey}`;
  }
}

export const baseApiService = new BaseApiService();
