import { ErrorMessage } from '@hookform/error-message';
import '../styles/input-with-error-message.scss';

export default function InputWithErrorMessage({errors, inputProps}){
    const { name } = inputProps;

    return (
        <div className={`input-with-error-message`}>
            <input
                {...inputProps}           
            />

            <ErrorMessage
                    errors={errors}
                    name={name}
                    className="error-message"
                    render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <p key={type} className="error-message__message">{message}</p>
                    ))
                    }
                />
        </div>
    )
}