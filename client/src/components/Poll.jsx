import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearResult, createPoll } from "../store";
import ShowResult from "./ShowResult";

const Poll = () => {
	const socket = useSelector((store) => store.socket);
	const { question, options, createdBy } = useSelector((store) => store.polls);
	const [result, setResult] = useState([]);
	const [correctAnswer, setCorrectAnswer] = useState(-1);
	const [timer, setTimer] = useState(-1);

	const dispatch = useDispatch();

	const [pollWindowOpen, setPollWindow] = useState(true);
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
	useEffect(() => {
		const cunter =
		timer > 0 && setInterval(() => setTimer(timer - 1), 1000);

		if(timer === 0){

			socket.emit('select_option', selectedAnswerIndex);
			setPollWindow(false);
		}
    return () => clearInterval(cunter);
	}, [timer]);
	
	useEffect(() => {
		socket.on("recieved", (data) => {
			dispatch(createPoll(data));
			dispatch(clearResult());
			setTimer(10);
		});
		socket.on("show_result", (data) => {
			console.log("result_received", data);
			setResult(data.result);
			setCorrectAnswer(data.correctAnswer);
		});
	}, [socket]);


	const onAnswerSelected = (answerIndex) => {
		setSelectedAnswerIndex(answerIndex);
		setPollWindow(false);
		setTimer(0);
	};

	return (
		<div className="w-full grid gap-2">
			{pollWindowOpen && (
				<>
					<h2 className="text-white">Q. {question && question} {timer> 0 && <span>{timer}</span>} </h2>
					<ul className="grid gap-2 w-full list-style-none text-white">
						{(options || []).map((answer, index) => (
							<li
								onClick={() => onAnswerSelected(index)}
								className="flex items-center w-full py-4 pl-5 space-x-2 border-2 cursor-pointer bg-white/5 hover:shadow hover:shadow-lg border-white/10 hover:border-white rounded-xl"
								key={index}
							>
								<p className="ml-6 text-white">{answer} <span>{correctAnswer!==-1 && result[index]}</span></p>
							</li>
						))}
					</ul>
				</>
			)}
			{!pollWindowOpen && timer>0 && <div>You have submitted the answer.</div>}
			{
				timer === 0 && (

				<div className="w-full grid place-items-center">
				<h1 className="text-xl ">Result</h1>
				 <ShowResult result={result} {...{question, options, correctAnswer}} />
			</div>
				)
			}
		</div>
	);
};

export default Poll;
