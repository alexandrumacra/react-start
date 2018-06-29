import React, {Component} from 'react';

export interface RegisterFormProps {
    usernameLabel?: string;
    passwordLabel?: string;
    phoneNumberLabel?: string;
    usernamePlaceholder?: string;
    passwordPlaceholder?: string;
    rePasswordPlaceholder?: string;
    phoneNumberPlaceholder?: string;
    backButtonEnabled?: boolean;
    backButtonText?: string;
    registerButtonText?: string;
    showDropdown?: boolean;
    dropdownOptions?: DropdownOptions[];
    dropdownLabel?: string;
    back?(): void;
    onSubmit?(credentials: RegisterCredentials): void;
}

export interface RegisterCredentials {
    username: string;
    password: string;
    rePassword: string;
    phoneNumber: string;
    dropdownValue?: string;
}

interface DropdownOptions {
    value: string;
    text: string;
}

interface RegisterFormState {
    username: string;
    password: string;
    rePassword: string;
    phoneNumber: string;
    usernameLabel: string;
    passwordLabel: string;
    phoneNumberLabel: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    rePasswordPlaceholder: string;
    phoneNumberPlaceholder: string;
    backButtonText: string;
    registerButtonText: string;
    showDropdown: boolean;
    dropdownLabel: string;
    selectedValue: string;
}

class RegisterForm extends Component<RegisterFormProps,RegisterFormState> {

    state: RegisterFormState = {
        username: '',
        password: '',
        rePassword: '',
        phoneNumber: '',
        selectedValue: '',
        usernameLabel: 'Email/Username',
        passwordLabel: 'Password',
        phoneNumberLabel: 'Phone No',
        usernamePlaceholder: 'Enter username',
        passwordPlaceholder: 'Enter password',
        rePasswordPlaceholder: 'Re-enter password',
        phoneNumberPlaceholder: 'Enter Phone Number',
        backButtonText: 'Go Back',
        registerButtonText: 'Register',
        showDropdown: false,
        dropdownLabel: 'Label'
    }

    handleChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as any);
    }  

    handleSubmit = (e: any) => {
        e.preventDefault();
        let credentials: RegisterCredentials = {
            username: this.state.username,
            password: this.state.password,
            rePassword: this.state.rePassword,
            phoneNumber: this.state.phoneNumber
        }
        if (this.state.selectedValue !== '') {
            credentials.dropdownValue = this.state.selectedValue
        }
        this.props.onSubmit(credentials);
    }

    renderBackButton = () => {
        if (
            (this.props.backButtonEnabled !== undefined &&
            this.props.backButtonEnabled === true) ||
            (this.props.backButtonEnabled === undefined)
        ) {
            return (
                <button 
                    className="acc-button back cancel"
                    onClick={() => this.props.back()}
                >
                    {this.props.backButtonText || this.state.backButtonText}
                </button>
            );
        }
        else {
            return null;
        }
    }

    renderDropdownList = () => {
        return (
            this.props.showDropdown === true &&
            this.props.dropdownOptions !== undefined ? 
            <div>
                <label htmlFor="select">{this.props.dropdownLabel || this.state.dropdownLabel}</label>
                <select id="select" name="selectedValue">
                    { this.renderDropdownOptions() }
                </select>
            </div> :
            <div />
        );
    }

    renderDropdownOptions = () => {
        return (
            this.props.dropdownOptions !== undefined ? 
            this.props.dropdownOptions.map((option: DropdownOptions) => {
                return (
                    <option value={option.value}>{option.text}</option>
                );
            }) :
            null
        );
    }

    render() {
        return (
            <form name="login-form" onSubmit={this.handleSubmit}>
                <div className="acc-default-container half flexible">
                     <h1>Register</h1>
                     {
                        this.renderBackButton()
                    }  
                     <div className="acc-form-container">
                        <div className="acc-form-inline">
                            <label>{this.props.usernameLabel || this.state.usernameLabel}</label>
                            <input 
                                type="text"
                                name="username"
                                onChange={(e: any) => this.handleChange(e)}
                                placeholder={
                                    this.props.usernamePlaceholder || 
                                    this.state.usernamePlaceholder
                                } 
                            />
                        </div>
                        <div className="acc-form-inline">
                            <label>{this.props.passwordLabel || this.state.passwordLabel}</label>
                            <input 
                                type="password" 
                                name="password"
                                onChange={(e: any) => this.handleChange(e)}
                                placeholder={
                                    this.props.passwordPlaceholder ||
                                    this.state.passwordPlaceholder
                                }
                            />
                        </div>
                         <div className="acc-form-inline">
                            <label>{this.props.passwordLabel || this.state.passwordLabel}</label>
                            <input 
                                type="password" 
                                name="rePassword"
                                onChange={(e: any) => this.handleChange(e)}
                                placeholder={
                                    this.props.rePasswordPlaceholder ||
                                    this.state.rePasswordPlaceholder
                                }
                            />
                        </div>
                        <div className="acc-form-inline">
                            <label>{this.props.phoneNumberLabel || this.state.phoneNumberLabel}</label>
                            <input 
                                    type="text" 
                                    name="phoneNumber"
                                    onChange={(e: any) => this.handleChange(e)}
                                    placeholder={
                                        this.props.phoneNumberPlaceholder ||
                                        this.state.phoneNumberPlaceholder
                                    }
                            />
                        </div>

                            {this.renderDropdownList()}

                            <div className="acc-center-align">
                                <button type="submit" className="acc-button primary">
                                    {this.props.registerButtonText || this.state.registerButtonText}
                                </button>
                            </div>
                    </div>                                     
                </div>
            </form>
        );
    }
}

export default RegisterForm;