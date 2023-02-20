import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from "../store";
import ShowResult from "./ShowResult";

const CreatePoll = () => {
	const socket = useSelector((store) => store.socket);
	const results = useSelector((store) => store.results);
	const dispatch = useDispatch();
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState(["", "", "", ""]);
	const [author, setAuthor] = useState("");
	const [correctAnswer, setCorrectAnswer] = useState(1);

	const handleOptionChange = (index, event) => {
		const newOptions = [...options];
		newOptions[index] = event.target.value;
		setOptions(newOptions);
	};
	const [timer, setTimer] = useState(-1);
  const [show, setshow] = useState(false);
	useEffect(() => {
		const cunter = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);

		console.log("timer: " + timer);

		if (timer === 0) {
			socket.emit("result", {
				result: results,
				correctAnswer: correctAnswer - 1,
			});
		}
		return () => clearInterval(cunter);
	}, [timer]);

	useEffect(() => {
		socket.on("update_result", (answerIndex) => {
			console.log(answerIndex);
			dispatch(updateResult(answerIndex));
		});
	}, [socket]);

	const handleSubmit = (event) => {
		event.preventDefault();
		createPoll(question, options, author);
    setshow(true);
	};

	const createPoll = (question, options, createdBy) => {
		const poll = {
			question,
			options,
			createdBy,
		};
		socket.emit("create_poll", poll);
		setTimer(60);
	};

	return (
		<>
		{
			!show && (
				<form onSubmit={handleSubmit} className="grid w-1/2 gap-2">
			<div className="grid grid-template-cols-6">
				<label className="grid-col-label" htmlFor="question">Question:</label>
				<input
					className="p-2 outline-none rounded-lg text-black h-24 "
					type="text"
					id="question"
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
				/>
			</div>

			<div className="grid grid-template-cols-6">
				<label className="grid-col-label" htmlFor="option1">Option 1:</label>
				<input
					className="p-2 outline-none rounded-lg text-black"
					type="text"
					id="option1"
					value={options[0]}
					onChange={(e) => handleOptionChange(0, e)}
				/>
			</div>

			<div className="grid grid-template-cols-6">
				<label className="grid-col-label" htmlFor="option2">Option 2:</label>
				<input
					className="p-2 outline-none rounded-lg text-black"
					type="text"
					id="option2"
					value={options[1]}
					onChange={(e) => handleOptionChange(1, e)}
				/>
			</div>

			<div className="grid grid-template-cols-6">
				<label className="grid-col-label" htmlFor="option3">Option 3:</label>
				<input
					className="p-2 outline-none rounded-lg text-black"
					type="text"
					id="option3"
					value={options[2]}
					onChange={(e) => handleOptionChange(2, e)}
				/>
			</div>

			<div className="grid grid-template-cols-6">
				<label className="grid-col-label" htmlFor="option4">Option 4:</label>
				<input
					className="p-2 outline-none rounded-lg text-black"
					type="text"
					id="option4"
					value={options[3]}
					onChange={(e) => handleOptionChange(3, e)}
				/>
			</div>

			<div className="grid grid-template-cols-6">
				<label className="grid-col-label" htmlFor="answer">Correct Answer</label>
				<input
					className="p-2 outline-none rounded-lg text-black"
					type="text"
					id="answer"
					value={correctAnswer}
					onChange={(e) => setCorrectAnswer(e.target.value)}
				/>
			</div>

			<button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-32" type="submit">Create Poll</button>
		</form>
			)
		}
		{
			show && (
				<div className="w-full grid place-items-center">
					<h1 className="text-xl ">Live results {timer> 0 && <span>{timer} second</span>}</h1>
					 <ShowResult result={results} {...{question, options, correctAnswer}} />
				</div>
			)
		}
		</>
	);
};

export default CreatePoll;
