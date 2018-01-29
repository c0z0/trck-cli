#!/usr/bin/env node
const notifier = require('node-notifier')
const ProgressBar = require('progress')

let minutes = 0

var bar = new ProgressBar('Working [:bar] :passed/:minutes min', {
	total: 25 * 2
})
var timer = setInterval(function() {
	bar.tick({ passed: Math.floor(minutes / 2), minutes: 25 })
	if (bar.complete) {
		clearInterval(timer)
		notifier.notify({
			title: 'Work done!',
			message: 'Time to take a 5 minute brake.',
			sound: true
		})
	}

	minutes++
}, 10)
