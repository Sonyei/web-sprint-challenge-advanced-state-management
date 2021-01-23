import React, { useState } from "react";
import { connect } from "react-redux";
import { addSmurf, setError, clearError } from "../actions/index";

const stupidSmurfs = {
	name: "",
	nickname: "",
	position: "",
	description: "",
	id: Date.now(),
};

function AddForm(props) {
	const [smurf, setSmurf] = useState(stupidSmurfs);

	const handleChange = (e) => {
		setSmurf({
			...smurf,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newSmurf = {
			name: smurf.name,
			nickname: smurf.nickname,
			position: smurf.position,
			description: smurf.description,
		};

		//prevent duplicate submission
		for (let i = 0; i < props.smurf.length; i++) {
			if (smurf.name === props.smurf[i].name) {
				return props.setError(
					"We already have that Smurf! Please enter a new one."
				);
			}
		}

		//alerts for fake form validation
		if (smurf.name === "" || smurf.position === "" || smurf.nickname === "") {
			props.setError("You must include a Name, Nickname, and Position.");
		} else {
			props.addSmurf(newSmurf);
		}

		// smurf.name === ""
		// 	? alert("Your Smurf needs a name!")
		// 	: smurf.nickname === ""
		// 	? alert("Your Smurf needs a nickname, too!")
		// 	: smurf.position === ""
		// 	? alert("Your Smurf needs a position in the village!")
		// 	: props.addSmurf(newSmurf);
		// setSmurf(stupidSmurfs);
	};

	return (
		<section>
			<h2>Add Smurf</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">
						Name:
						<input
							type="text"
							value={smurf.name}
							onChange={handleChange}
							name="name"
							id="name"
						/>
					</label>
					<br />

					<label htmlFor="nickname">
						Nickname:
						<input
							type="text"
							value={smurf.nickname}
							onChange={handleChange}
							name="nickname"
							id="nickname"
						/>
					</label>
					<br />

					<label htmlFor="position">
						Position:
						<input
							type="text"
							value={smurf.position}
							onChange={handleChange}
							name="position"
							id="position"
						/>
					</label>
					<br />

					<label htmlFor="description">
						Description:
						<input
							type="text"
							value={smurf.description}
							onChange={handleChange}
							name="description"
							id="description"
						/>
					</label>
				</div>

				{props.error ? (
					<div
						data-testid="errorAlert"
						className="alert alert-danger"
						role="alert"
					>
						Error: {props.error}
					</div>
				) : (
					//Their Error doesn't appreciate being in <p> tags, I guess.
					""
				)}
				<button>Submit Smurf</button>
			</form>
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		...state,
	};
};

export default connect(mapStateToProps, { addSmurf, setError, clearError })(
	AddForm
);

//1. Add in all necessary import components and library methods.
//2. Connect all needed redux state props and action functions to the component before exporting.
//3. Add state holding name, position, nickname and description to component.
//4. Build form DOM to include inputs for name, position and description of the component.
//      - an array of smurfs
//      - a boolean indicating if the app is loading
//      - error text
//      - MAKE SURE TO CORRECTLY CONNECT LABELS TO YOUR FORM INPUTS. USE THE PATERN OF SHOWN FOR NAME.
//5. Build eventhandler and listener needed to change the state.
//6. Build eventhandler and listener needed to submit a new smurf and dispatch it's assosated action.
//7. Ensure that the included alert code only displays when error text is passed in from redux.
//4. DO NOT DELETE THE data-testid FIELD FROM THE ERROR ALERT! This is used for sprint grading.
//8. Style as necessary.
