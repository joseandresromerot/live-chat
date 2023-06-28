import OutlinedField from './outlined-field';
import classes from './outlined-textfield.module.css';

interface OutlinedTextfieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  containerClassName?: string
  disabledClassName?: string
  error?: string
  disabled?: boolean
}

const OutlinedTextfield = ({className, containerClassName, disabledClassName, error, ...rest}: OutlinedTextfieldProps) => {
  return (
    <>
      <OutlinedField containerClassName={containerClassName} disabledClassName={disabledClassName} error={error} disabled={rest.disabled}>
        <input {...rest} className={`${classes.input} ${className}`} />
      </OutlinedField>
    </>
  );
}

OutlinedTextfield.defaultProps = {
  className: ""
};

export default OutlinedTextfield;