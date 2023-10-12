export class Paginacion {
  procesos = [];
  queue = [];
  memoria = [];
  memoriaSize = 0;
  waitingProcesses = []; // Lista de procesos en espera

  frames = new Array(10).fill(null); // Represent the frames in the memory
  pageTable = new Map(); // Keep track of which pages of each process are in which frames

  constructor(procesos, memoriaSize) {
    this.procesos = procesos;
    this.memoriaSize = memoriaSize;
  }

  async addProcessToMemory(process) {
    const numberOfPages = Math.ceil(process.size / this.memoriaSize);

    for (let i = 0; i < numberOfPages; i++) {
      const frameIndex = this.frames.findIndex(frame => frame === null);
      console.log(frameIndex);

      if (frameIndex === -1) {
        this.addProcessToWaitingQueue(process);
        return;
      }

      this.frames[frameIndex] = { processId: process.id, pageIndex: i };
      console.log(this.frames)
      this.pageTable.set(`${process.id}-${i}`, frameIndex);
      console.log(this.pageTable)
    }

    await process.runProcess(() => this.terminateProcess(process));
  }
  addProcessToWaitingQueue(process) {
    this.waitingProcesses.push(process);
    console.log("Waiting process: " + this.waitingProcesses);
  }

  terminateProcess(process) {
    const numberOfPages = Math.ceil(process.size / this.memoriaSize);

    for (let i = 0; i < numberOfPages; i++) {
      const frameIndex = this.pageTable.get(`${process.id}-${i}`);
      console.log(frameIndex);

      if (frameIndex !== undefined) {
        this.frames[frameIndex] = null;
        this.pageTable.delete(`${process.id}-${i}`);
      }
    }

    if (this.waitingProcesses.length > 0) {
      const nextProcess = this.waitingProcesses.shift();
      this.addProcessToMemory(nextProcess);
    }
  }

}
