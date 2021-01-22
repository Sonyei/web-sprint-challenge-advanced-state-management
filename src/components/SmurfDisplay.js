import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSmurf } from "../actions";
import Smurf from "./Smurf";
import AddForm from "../components/AddForm";

const SmurfDisplay = ({ smurf, isFetching, error, fetchSmurf }) => {
	useEffect(() => {
		fetchSmurf();
	}, []);

	if (error) {
		return <h2>ERROR: {error}</h2>;
	}

	if (isFetching) {
		return <h2>Looking for Smurfs...</h2>;
	}

	return (
		<div>
			<AddForm />
			{smurf.map((smurf) => (
				<Smurf
					key={smurf.id}
					name={smurf.name}
					nickname={smurf.nickname}
					position={smurf.position}
					description={smurf.description}
				/>
			))}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		smurf: state.smurf,
		isFetching: state.isFetching,
		error: state.error,
	};
};
export default connect(mapStateToProps, { fetchSmurf })(SmurfDisplay);

//Task List:
//1. Import in all needed components and library methods.
//2. Connect all needed redux state props and action functions to the component before exporting.
//3. Fetch all smurfs when the component first mounts.
//4. Render loading text or graphic if the application is currently loading.
//5. Render a list of all Smurfs using the Smurf component if the application is not currently loading.
