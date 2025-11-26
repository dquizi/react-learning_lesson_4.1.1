import { useState, useRef } from 'react';
import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [confirmPasswordError, setConfirmPasswordError] = useState(null);

	const onMailChange = ({ target }) => {
		setEmail(target.value);

		let newError = null;

		if (!/[@]/.test(target.value)) newError = "Почта должна содержать знак '@'";

		if (!target.value) newError = "Обязательное поле";

		setEmailError(newError);
		validateAllFields(email, password, confirmPassword, newError, passwordError, confirmPasswordError);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let newError = null;

		if (!/[A-ZА-Я]/.test(target.value)) {
			newError = 'Пароль должен содержать хотя бы одну заглавную букву';
		}

		setPasswordError(newError);
		validateAllFields(email, password, confirmPassword, newError, passwordError, confirmPasswordError);
	};

	const onConfirmPasswordChange = ({ target }) => {
		setConfirmPassword(target.value);

		let newError = null;

		if (target.value !== password) {
			newError = "Пароли не совпадают";
		}

		setConfirmPasswordError(newError);
		validateAllFields(email, password, confirmPassword, newError, passwordError, confirmPasswordError);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password, confirmPassword });
	};

	const submitButtonRef = useRef(null);

	const validateAllFields = (currentEmail, currentPassword, currentConfirmPassword,
		currentEmailError, currentPasswordError, currentConfirmPasswordError) => {
		if (currentEmail && !currentEmailError &&
			currentPassword && !currentPasswordError &&
			currentConfirmPassword && !currentConfirmPasswordError) {
			submitButtonRef.current.focus();
		}
	};

	const checkAndFocus = () => {
		if (email && !emailError &&
			password && !passwordError &&
			confirmPassword && !confirmPasswordError &&
			submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	};

	const onEmailBlur = () => {
		checkAndFocus();
	};

	const onPasswordBlur = () => {
		checkAndFocus();
	};

	const onConfirmPasswordBlur = () => {
		checkAndFocus();
	};

	return (
		<div className={styles.registration}>
			<h1>Создать аккаунт</h1>
			<form className={styles.form} onSubmit={onSubmit}>
				<span>Введите почту</span>
				<input type="email" name="email" value={email} onChange={onMailChange} onBlur={onEmailBlur} />
				{emailError && <div className={styles.error}>{emailError}</div>}

				<span>Придумайте пароль</span>
				<input type="password" name="password" value={password} onChange={onPasswordChange} onBlur={onPasswordBlur} />
				{passwordError && <div className={styles.error}>{passwordError}</div>}

				<span>Подтвердите пароль</span>
				<input type="password" name="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} onBlur={onConfirmPasswordBlur} />
				{confirmPasswordError && <div className={styles.error}>{confirmPasswordError}</div>}

				<button type="submit" disabled={!!emailError || !!passwordError || !!confirmPasswordError} ref={submitButtonRef}>Зарегистрироваться</button>
			</form>

		</div>
	);
};

export default App
