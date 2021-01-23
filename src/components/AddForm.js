import React from "react";
import { connect } from "react-redux";
import { addSmurf, setError } from "../actions/index";

//APPARENTLY THIS HAS TO BE A CLASS COMPONENT OR YOU FAIL THE ENTIRE THING REGARDLESS OF DEMONSTRABLE FUNCTIONALITY

class AddForm extends React.Component {
	state = {
		name: "",
		position: "",
		nickname: "",
		description: "",
	};

	handleChange = (e) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			name: "",
			position: "",
			nickname: "",
			description: "",
		});

		//prevent duplicate submissions
		for (let i in this.props.smurf) {
			if (this.state.name === this.props.smurf[i].name) {
				return this.props.setError(
					"We already have that Smurf! Please submit a new one."
				);
			}
		}

		//alerts for fake form validation
		if (
			this.state.name === "" ||
			this.state.position === "" ||
			this.state.nickname === ""
		) {
			this.props.setError("You must include a Name, Nickname, and Position.");
		} else {
			this.props.addSmurf(this.state);
			this.setState({
				name: "",
				position: "",
				nickname: "",
				description: "",
			});
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

	render() {
		return (
			<section>
				<h2>Add Smurf</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">
							Name:
							<input
								name="name"
								type="text"
								placeholder="Please enter a name."
								value={this.state.input}
								onChange={this.handleChange}
								id="name"
							/>
						</label>
						<br />

						<label htmlFor="nickname">
							Nickname:
							<input
								name="nickname"
								type="text"
								placeholder="Please enter a nickname."
								value={this.state.input}
								onChange={this.handleChange}
								id="nickname"
							/>
						</label>
						<br />

						<label htmlFor="position">
							Position:
							<input
								name="position"
								type="text"
								placeholder="Please enter a position."
								value={this.state.input}
								onChange={this.handleChange}
								id="position"
							/>
						</label>
						<br />

						<label htmlFor="description">
							Description:
							<input
								name="description"
								type="text"
								placeholder="Please enter a description."
								value={this.state.input}
								onChange={this.handleChange}
								id="description"
							/>
						</label>
						{this.props.error ? (
							<div
								data-testid="errorAlert"
								className="alert alert-danger"
								role="alert"
							>
								Error: {this.props.error}
							</div>
						) : (
							""
						)}
					</div>
					<button>Submit Smurf</button>
				</form>
			</section>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		...state,
		smurf: state.smurf,
		isFetching: state.isFetching,
		error: state.error,
	};
};

export default connect(mapStateToProps, { addSmurf, setError })(AddForm);

//Task List:
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
