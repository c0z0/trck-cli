#!/usr/bin/env node
const notifier = require('node-notifier')
const chalk = require('chalk')
const boxen = require('boxen')
const arg = require('arg')

const args = arg({
	// Types
	'--help': Boolean,
	'--work': Number,
	'--break': Number,

	// Aliases
	'-h': '--help',
	'-w': '--work',
	'-b': '--break'
})

if (args['--help']) {
	console.log('--work | -w : minutes of work')
	console.log('--break | -b : minutes of break')
	process.exit()
}

const settings = {
	work: args['--work'] || 25,
	break: args['--break'] || 5
}

function startWorking() {
	let seconds = 0
	const time = 60 * settings.work
	const timer = setInterval(() => {
		console.log('\x1Bc')
		console.log(
			boxen(
				chalk.bold(`Working `) +
					`${Math.floor((time - seconds) / 60)
						.toString()
						.padStart(2, '0')}:${((time - seconds) % 60)
						.toString()
						.padStart(2, '0')}`,
				{
					padding: 1,
					borderColor: 'yellow',
					borderStyle: 'round',
					float: 'center'
				}
			)
		)
		if (seconds === time) {
			clearInterval(timer)
			notifier.notify('Time for a break!')
			startBreak()
		}
		seconds++
	}, 1000)
}

function startBreak() {
	let seconds = 0
	const time = 60 * settings.break
	const timer = setInterval(() => {
		console.log('\x1Bc')
		console.log(
			boxen(
				chalk.bold(`Break time `) +
					`${Math.floor((time - seconds) / 60)
						.toString()
						.padStart(2, '0')}:${((time - seconds) % 60)
						.toString()
						.padStart(2, '0')}`,
				{
					padding: 1,
					borderColor: 'green',
					float: 'center',
					borderStyle: 'round'
				}
			)
		)
		if (seconds === time) {
			clearInterval(timer)
			notifier.notify('Time for work!')
			startWorking()
		}
		seconds++
	}, 1000)
}

startWorking()
