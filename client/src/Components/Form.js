// buttons and displays any validation errors
const Form = (props) => {
    
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit(event);
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel(event);
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <button 
                    className="button" 
                    type="submit">{submitButtonText}</button>
                <button 
                    className="button button-secondary" 
                    onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

const ErrorsDisplay = ({errors}) => {
    let errorsDisplay = null;

    if (errors) {
        if (errors.length) {
            errorsDisplay = (
                <div className="validation--errors">
                    <h3>Validation errors</h3>
                    <ul>
                        {errors.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                </div>
            );
        }
    }

    return errorsDisplay;
}

export default Form;
