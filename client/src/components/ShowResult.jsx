import React from "react";

const ShowResult = ({
	result,
	question,
	options,
	correctAnswer,
	totalAnswers,
	selectedOption,
}) => {
	const getPercentage = (value) => {
		if (!totalAnswers) {
			console.log(result);
			totalAnswers = result.reduce((acc, curr) => acc + curr, 0);
		}

		if (!totalAnswers) return 0;
		const percentage = parseInt((value / totalAnswers) * 100);
		return percentage;
	};
	return (
		<div className="w-1/2 grid gap-2">
			<h2 className="text-white">Q. {question && question} </h2>
			<ul className="grid gap-2 w-full list-style-none text-white">
				{(options || []).map((answer, index) => (
					<li
						className={`flex items-center w-full py-4 pl-5 space-x-2 border-2 cursor-pointer bg-white/5 hover:shadow hover:shadow-lg border-white/10 hover:border-white rounded-xl ${
							correctAnswer === index && "border-green-400"
						} ${selectedOption === index && "border-yellow-500"}`}
						key={index}
					>
						<p className="ml-6 text-white flex justify-between w-full pr-2">
							<span>{answer}</span>{" "}
							<span
								className={` ${
									correctAnswer === index ? "text-green-400" : "text-red-400"
								}`}
							>
								{getPercentage(result[index])}%
							</span>
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ShowResult;
