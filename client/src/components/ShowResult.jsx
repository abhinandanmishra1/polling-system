import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShowResult = ({result,question, options, correctAnswer }) => {

	return (
		<div className="w-1/2 grid gap-2">
					<h2 className="text-white">Q. {question && question}  </h2>
					<ul className="grid gap-2 w-full list-style-none text-white">
						{(options || []).map((answer, index) => (
							<li
								className="flex items-center w-full py-4 pl-5 space-x-2 border-2 cursor-pointer bg-white/5 hover:shadow hover:shadow-lg border-white/10 hover:border-white rounded-xl"
								key={index}
							>
								<p className="ml-6 text-white">{answer} <span>{correctAnswer!==-1 && result[index]}</span></p>
							</li>
						))}
					</ul>
		</div>
	);
};

export default ShowResult;
