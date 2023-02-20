const { Poll, Response } = require('./db');

const registerSocketEvents = (io) => {
  // Set up the socket.io connection
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle create poll event
    socket.on('createPoll', async (data) => {
      const { question, options, createdBy } = data;
      const poll = new Poll({
        question,
        options,
        isOpen: true,
        createdBy,
      });

      try {
        const newPoll = await poll.save();
        io.emit('newPoll', newPoll);
      } catch (error) {
        console.error(error);
      }
    });

    // Handle get poll event
    socket.on('getPoll', async (data) => {
      const question = data.question;

      try {
        const poll = await Poll.findOne({ question });
        if (!poll) {
          socket.emit('pollNotFound', { message: 'Poll not found' });
          return;
        }

        const responses = await Response.find({ pollQuestion: question });
        const result = poll.options.reduce((acc, option) => {
          const count = responses.filter((r) => r.selectedOption === option).length;
          acc[option] = count;
          return acc;
        }, {});

        socket.emit('pollResult', result);
      } catch (error) {
        console.error(error);
      }
    });

    // Handle submit response event
    socket.on('submitResponse', async (data) => {
      const { pollQuestion, selectedOption, studentName } = data;
      const response = new Response({
        pollQuestion,
        selectedOption,
        studentName,
      });

      try {
        const newResponse = await response.save();
        io.emit('newResponse', newResponse);
      } catch (error) {
        console.error(error);
      }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = {
  registerSocketEvents,
};
