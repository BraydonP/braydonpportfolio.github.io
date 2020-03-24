class Weather {
    constructor(city, state){
        this.apiKey = 'ff5bdd7df2f04d3c2f5ba0ea91772625';
        this.city = city;
        this.state = state;
    }

    // Fetch Weather from API. Using OpenWeatherMap instead of Brad's Weather Underground,
    // as Weather Underground no longer give out free API keys for personal use.

    async getWeather(){
        
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apiKey}`);
        const responseData = await response.json();

        return responseData;
    }

    changeLocation(city, state){
        this.city = city;
        this.state = state;
        
    }
}