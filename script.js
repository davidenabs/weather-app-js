document.addEventListener('DOMContentLoaded', function() {
    
    // OpenWeather API key
    const apiKey = '4e8216210776efff56260323227888f5';
    // Input and button elements
    const cityElement = document.getElementById('city');
    const searchButton = document.getElementById('search');

    // Output elements
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const forecastElement = document.getElementById('forecast');

    // Listen for the button click
    searchButton.addEventListener('click', function() {

        // Get the city element value
        const city = cityElement.value;

        if (city && city.length >= 2) {
            // Call the function that gets weather data
            getWeatherData(city);
        } else {
            alert('No city found or you imputed a city with less than 2 characters');
        }

    });

    async function getWeatherData(city) {
        
        try {

            // Call api endpoint
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

            const weatherData = await response.json();

            // Output the provided weather data
            temperatureElement.textContent = `Temperature: ${weatherData.main.temp}°C`;
            humidityElement.textContent = `Humidity: ${weatherData.main.humidity}%`;

            // Call the forecast API endpoint
            getWeatherForecast(city);

        } catch (error) {
            alert('Oops! Something went wrong.')
            console.error('Error: ' + error.message);
        }

    }


    async function getWeatherForecast(city) {
        
        try {
            
            // Call api endpoint
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);

            const forecastData = await response.json();

            forecastElement.innerHTML = ''

            const forecastItem = document.createElement('ul');

            for (let i = 0; i < forecastData.list.length; i += 8) {
                
                const date = new Date(forecastData.list[i].dt * 1000).toDateString();
                const temperature = forecastData.list[i].main.temp;
                const humidity = forecastData.list[i].main.humidity;
    

                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${date}</strong> Temperature: ${temperature} Humidity: ${humidity}`;
                forecastItem.appendChild(listItem); 
            }
            forecastElement.appendChild(forecastItem); 
            // console.log(forecastData); 

        } catch (error) {
            alert('Oops! Something went wrong.')
            console.error('Error: ' + error.message);
        }

    }

});