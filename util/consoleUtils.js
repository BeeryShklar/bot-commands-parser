export const colors = {
	yellow: '\x1b[33m',
	grey: '\x1b[33m',
	red: '\x1b[31m',
	purple: '\x1b[35m',
	brown: '\x1b[33m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	reset: '\x1b[0m',
}

export const color = (text, color) =>
	`${colors[color] ?? colors['reset']}${text}${colors['reset']}`
