function getRandomColor() {
  const letters = "89ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

let nextProcessId = 0;

export class Process {
  id;
  name;
  burstTime;
  time;
  priority;
  size; // Nuevo atributo para el tamaño del proceso en la memoria
  color;
  waitingTime;
  arrivalTime;
  startTime;
  completionTime;
  turnaroundTime;
  responseTime;

  constructor(name, burstTime, time, priority) {
    this.id = nextProcessId++;
    this.name = name;
    this.burstTime = burstTime;
    this.time = time;
    this.priority = priority;
    this.size = burstTime;
    this.color = getRandomColor();
    this.waitingTime = 0;

    this.arrivalTime = this.time;
    this.startTime = 0;
    this.completionTime = 0;
    this.turnaroundTime = 0;
    this.responseTime = 0;
  }
  runProcess(callback) {
    return new Promise(resolve => {
      setTimeout(() => {
        callback();
        resolve();
      }, this.size * 1000);
    });
  }

}


