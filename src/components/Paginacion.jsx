import {useState} from 'react';
import ProcessAdder from "./ProcessAdder.jsx";


const Fcfs = () => {
  const [enabled, setEnabled] = useState(false);
  const [processes, setProcesses] = useState([]);

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
                <th>PROCESO</th>
                <th>TAMANO</th>
              </tr>
              </thead>
              <tbody>
              {processes.map((process) => (
                <tr
                  key={process.id}
                  style={{ backgroundColor: process.color }}
                >
                  <td>{process.name}</td>
                  <td>{process.burstTime}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        ) : null}


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

export default Fcfs;