const cluster = require('cluster');
const os = require('os');

const app = require('./app'); 

const PORT = process.env.PORT || 3000;
// const numCPUs = os.cpus().length;  // This is to Get the number of CPU cores
const numCPUs = process.env.CLUSTERS || 1;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });
}
