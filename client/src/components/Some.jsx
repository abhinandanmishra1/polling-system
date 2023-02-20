import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CreatePoll from './CreatePoll';
import Poll from './Poll';
// const socket = io.connect("http://localhost:5000");


const App = () => {
  const [polls, setPolls] = useState([]);

  return (
    <div>
      <h1>Polling System</h1>
      <div>
        {/* {polls.map((p) => (
          <Poll key={p._id} poll={p} onSelectOption={selectOption} />
        ))} */}
      </div>
      <hr />
      <CreatePoll createPoll={createPoll} />
      {poll && <Poll poll={poll} onSelectOption={selectOption} />}
    </div>
  );
};

export default App;
