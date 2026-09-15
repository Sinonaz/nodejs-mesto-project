require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'api-service',
      cwd: '/home/sinonaz/nodejs-mesto-project/current',
      script: './dist/app.js',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,

      'pre-deploy-local': `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/.env`,

      'post-deploy': [
        'export NVM_DIR="$HOME/.nvm"',
        '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"',
        'nvm use',
        'ln -sfn /home/sinonaz/nodejs-mesto-project/.env .env',
        'npm ci',
        'npm run build',
        'pm2 startOrReload ecosystem.config.js --env production --update-env',
      ].join(' && '),
    },
  },
};
