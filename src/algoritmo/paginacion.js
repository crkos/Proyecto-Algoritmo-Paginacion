export class Paginacion {
  procesos = [];
  memoriaSize = 0;
  waitingProcesses = []; // Lista de procesos en espera
  frames = new Array(16).fill(null); // Memoria en los frames

  constructor(procesos, memoriaSize, setFrames, setWaitingQueue) {
    this.procesos = procesos;
    this.memoriaSize = memoriaSize;
    this.setFrames = setFrames;
    this.setWaitingQueue = setWaitingQueue;
  }

  updateFrames(newFrames) {
    this.frames = [...newFrames];
    this.setFrames(this.frames);
  }

  updateWaitingQueue(newWaitingQueue) {
    this.waitingProcesses = [...newWaitingQueue];
    this.setWaitingQueue(this.waitingProcesses);
  }


  async addProcessToMemory(process) {
    const numberOfFramesRequired = process.burstTime;
    const emptyFrames = this.frames.filter(frame => frame === null).length;
    console.log(`Adding process ${process.id} to memory. Frames required: ${numberOfFramesRequired}`);

    if (numberOfFramesRequired > emptyFrames) {
      this.addProcessToWaitingQueue(process);
      return;
    }

    for (let i = 0; i < numberOfFramesRequired; i++) {
      const frameIndex = this.frames.findIndex(frame => frame === null);

      if (frameIndex === -1) {
        this.addProcessToWaitingQueue(process);
        return;
      }

      this.frames[frameIndex] = { processName: process.name, frameIndex: i };
      console.log(`Assigned process ${process.id} to frame ${frameIndex}`);
    }
    this.updateFrames(this.frames);
    console.log(`Current frames: ${JSON.stringify(this.frames)}`);
    await process.runProcess(() => this.terminateProcess(process));
    this.setFrames(this.frames);
  }

  addProcessToWaitingQueue(process) {
    this.waitingProcesses.push(process);
    this.updateWaitingQueue(this.waitingProcesses)
    console.log(`Process ${process.id} added to waiting queue.`);
  }

  async terminateProcess(process) {
    const numberOfFramesOccupied = process.size;
    console.log(`Terminating process ${process.id}. Frames to free: ${numberOfFramesOccupied}`);

    for (let i = 0; i < numberOfFramesOccupied; i++) {
      const frameIndex = this.frames.findIndex(frame => frame && frame.processName === process.name);

      if (frameIndex !== -1) {
        this.frames[frameIndex] = null;
        console.log(`Freed frame ${frameIndex}`);
      }
    }

    console.log(`Current frames: ${JSON.stringify(this.frames)}`);
    this.updateFrames(this.frames);
    if (this.waitingProcesses.length > 0) {
      const nextProcess = this.waitingProcesses.shift();
      await this.addProcessToMemory(nextProcess);
      this.updateWaitingQueue(this.waitingProcesses);
    }
  }
}


