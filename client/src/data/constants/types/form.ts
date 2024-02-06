import { Dispatch, SetStateAction } from 'react';

export interface registerUserFormFields {
	email: string;
	name: string;
	pw: string;
	pwConfirm: string;
}

export interface loginFormFields {
	email: string;
	pw: string;
}

export interface changeNameFormField {
	name: string;
}

export interface changePasswordFormField {
	pw: string;
	pwConfirm: string;
}

export interface FormState {
	changingName: boolean;
	changingPassword: boolean;
}

export interface FormStateProps {
	formState: FormState;
	setFormState: Dispatch<SetStateAction<FormState>>;
}

export interface calendarFormFields {
	title: string;
	content: string;
	plant: string;
}

export interface PostFormProps {
	selectedDate: string;
	handleModalClose: () => void;
}
