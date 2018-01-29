#!/usr/bin/env node
const notifier = require('node-notifier')
const chalk = require('chalk')
const boxen = require('boxen')

function startWorking() {
	let seconds = 0
	const timer = setInterval(() => {
		console.log('\x1Bc')
		console.log(
			boxen(
				chalk.bold(`Working `) +
					`${Math.floor((60 * 25 - seconds) / 60)
						.toString()
						.padStart(2, '0')}:${((60 * 25 - seconds) % 60)
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
		if (seconds === 25 * 60) {
			clearInterval(timer)
			notifier.notify('Time for a break!')
			startBreak()
		}
		seconds++
	}, 1000)
}

function startBreak() {
	let seconds = 0
	const timer = setInterval(() => {
		console.log('\x1Bc')
		console.log(
			boxen(
				chalk.bold(`Break time `) +
					`${Math.floor((60 * 5 - seconds) / 60)
						.toString()
						.padStart(2, '0')}:${((60 * 5 - seconds) % 60)
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
		if (seconds === 5 * 60) {
			clearInterval(timer)
			notifier.notify('Time for work!')
			startWorking()
		}
		seconds++
	}, 1000)
}

startWorking()
