module.exports = {
	apps: [
		{
			name: 'solslab-admin',
			script: 'build/index.js',
			env_production: {
				NODE_ENV: 'production',
				PORT: 5174
			}
		}
	]
};
