import {useEffect, useState} from 'react';
import ProcessAdder from "./ProcessAdder.jsx";
import {Paginacion} from "../algoritmo/paginacion.js";


const Pagination = () => {
  const [enabled, setEnabled] = useState(false);
  const [processes, setProcesses] = useState([])
  const [frames, setFrames] = useState(new Array(10).fill(null));
  const [waitingQueue, setWaitingQueue] = useState([]);

  useEffect(() => {
    if (enabled) {
      const paginacion = new Paginacion(processes, 10, setFrames, setWaitingQueue);

      processes.forEach(async process => {
        await paginacion.addProcessToMemory(process);
      });
    }
  }, [enabled, processes]);
  const handleEnable = () => {
    setEnabled(prevState => !prevState);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ProcessAdder setProcesses={setProcesses} />
        {processes.length > 0 ? (
          <div>
            <h2>Procesos</h2>
            <table className="process-table">
              <thead>
              <tr>
                <th>Proceso</th>
                <th>Tamaño</th>
              </tr>
              </thead>
              <tbody>
              {processes.map((process) => (
                <tr
                  key={process.id}
                  style={{ backgroundColor: process.color }}
                >
                  <td>{process.name}</td>
                  <td>{process.size}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div>
          <h2>Frames</h2>
          <table className="frames-table">
            <thead>
            <tr>
              <th>Frame</th>
              <th>Process ID</th>
            </tr>
            </thead>
            <tbody>
            {frames.map((frame, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{frame ? frame.processId : 'Empty'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Waiting Queue</h2>
          <table className="waiting-queue-table">
            <thead>
            <tr>
              <th>Position</th>
              <th>Process ID</th>
            </tr>
            </thead>
            <tbody>
            {waitingQueue.map((process, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{process.id}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>



      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h2 style={{
          textAlign: "center"
        }}>Algoritmo de paginacion de memoria</h2>
        <button onClick={handleEnable} style={{
          display: enabled ? 'none' : 'block'
        }}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Pagination;