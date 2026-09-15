#!/usr/bin/env bash
set -e

export NVM_DIR="/home/sinonaz/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "NVM не найден: $NVM_DIR/nvm.sh"
  exit 1
fi

nvm use

ln -sfn /home/sinonaz/nodejs-mesto-project/.env .env

npm ci
npm run build

pm2 startOrReload ecosystem.config.js --env production --update-env
