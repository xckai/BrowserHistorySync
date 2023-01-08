cd ./Web
npm run build
cd ../SyncManagerApi
docker build . -t xckai123/browser-history-sync:0.0.2
