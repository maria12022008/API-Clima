
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Sua chave da API WeatherAPI.com
const apiKey = 'aa91369fae3e409996e140646252608'; // Substitua pela sua chave real!

// Função para buscar dados de clima
async function getWeatherData(city) {
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`;
        const response = await axios.get(url);
        const data = response.data;

        return {
            cidade: data.location.name,
            temperatura_atual: data.current.temp_c,
            temperatura_minima: 'Não disponível na chamada atual',
            temperatura_maxima: 'Não disponível na chamada atual',
            vento: data.current.wind_kph,
            descricao: data.current.condition.text
        };
    } catch (error) {
        console.error(`Erro ao buscar dados para ${city}:`, error.message);
        return {
            erro: 'Não foi possível obter dados de clima para esta cidade. Verifique se o nome está correto.'
        };
    }
}

// Endpoint para São Paulo
app.get('/sp', async (req, res) => {
    const data = await getWeatherData('Sao Paulo');
    res.json(data);
});

// Endpoint para Damasco
app.get('/damasco', async (req, res) => {
    const data = await getWeatherData('Damascus');
    res.json(data);
});

// Endpoint para Bangladesh (usando a capital Dhaka)
app.get('/bangladesh', async (req, res) => {
    const data = await getWeatherData('Dhaka');
    res.json(data);
});

// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Servidor de clima rodando. Use /sp, /damasco, ou /bangladesh para ver os dados.');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});