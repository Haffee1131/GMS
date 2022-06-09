import { useState, useEffect } from "react";
import { Button, Form, Loader } from "semantic-ui-react";

import styles from "../styles/addIssue.module.css";

export default function Home() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		category: "",
		issue: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const [successMsg, setSuccessMsg] = useState(false);

	useEffect(() => {
		if (isSubmitting) {
			if (Object.keys(errors).length === 0) {
				addIssue();
			} else {
				setIsSubmitting(false);
			}
		}
	}, [errors]);

	const addIssue = async () => {
		try {
			const res = await fetch("/api/issues", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			setIsSubmitting(false);
			setSuccessMsg(true);
		} catch (error) {
			console.log(error);
		}
	};

	function handleSubmit(event) {
		event.preventDefault();
		let errs = validate();
		setErrors(errs);
		setIsSubmitting(true);
	}

	function handleChange(event) {
		setFormData((prevFormData) => ({
			...prevFormData,
			[event.target.name]: event.target.value,
		}));
	}

	function validate() {
		let err = {};

		if (!formData.name) {
			err.name = "Name is Required";
		}
		if (!formData.email) {
			err.email = "Email is Required";
		}
		if (!formData.category) {
			err.category = "Category is Required";
		}
		if (!formData.issue) {
			err.issue = "Issue is Required";
		}

		return err;
	}

	return (
		<div className={styles.form_container}>
			<div className={styles.title}>
				<h1>Raise Issue</h1>
			</div>
			<div>
				{isSubmitting ? (
					<div>
						<center>
							<h3> Please wait while we process your Issue...</h3>
						</center>
						<br />
						<br />
						<Loader active inline="centered" />
					</div>
				) : (
					<>
						<Form onSubmit={handleSubmit}>
							<Form.Input
								fluid
								label="Name"
								placeholder="Ex: Aman"
								onChange={handleChange}
								name="name"
								value={formData.name}
								error={
									errors.name
										? {
												content: "Please Enter a Name",
												pointing: "below",
										  }
										: null
								}
							/>

							<Form.Input
								fluid
								label="Email"
								type="email"
								placeholder="Ex: google@gmail.com"
								onChange={handleChange}
								name="email"
								value={formData.email}
								error={
									errors.email
										? {
												content: "Please Enter Your Email",
												pointing: "below",
										  }
										: null
								}
							/>
							<Form.Input
								fluid
								label="Category"
								placeholder="Mess Issue"
								onChange={handleChange}
								name="category"
								value={formData.category}
								error={
									errors.category
										? {
												content: "Please Enter Your Category",
												pointing: "below",
										  }
										: null
								}
							/>

							<Form.TextArea
								label="Issue"
								placeholder="Detailed Issue Description"
								onChange={handleChange}
								name="issue"
								value={formData.issue}
								error={
									errors.issue
										? {
												content: "Please Enter Your Issue",
												pointing: "below",
										  }
										: null
								}
							/>
							<Button type="submit" color="green">
								Submit
							</Button>
							<br />
							<br />
							<br />

							{successMsg && (
								<div className="ui form success">
									<div className="ui success message">
										<div className="header">
											Complaint Raise was successful.
										</div>
										<p>
											W'll Try To Resolve It <b>As Soon As Possible.</b>
										</p>
									</div>
								</div>
							)}
						</Form>
					</>
				)}
			</div>
		</div>
	);
}
