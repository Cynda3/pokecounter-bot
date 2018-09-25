var fs = require('fs');
const Telegraf = require('telegraf');

const API_TOKEN = process.env.API_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://your-heroku-app.herokuapp.com';

const bot = new Telegraf(API_TOKEN);

var raidboss = JSON.parse(fs.readFileSync('raids_pokemon.json','utf-8'));

bot.hears(/Como .+ a .+ con .+/i, buscar_counter);

function buscar_counter(ctx) {
	var pokemon = ctx.message.text.split(' a ')[1].split(' con ')[0];
	var movimiento = ctx.message.text.split(' a ')[1].split(' con ')[1];
	var counters = raidboss[pokemon][movimiento].join(', ');

	ctx.reply(`A ${pokemon} se le tiene que tirar con ${counters}`);
}

bot.start((ctx) => ctx.reply('Welcome to the world of Pokémon!'));

//bot.startPolling();
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
bot.startWebhook(`/bot${API_TOKEN}`, null, PORT)