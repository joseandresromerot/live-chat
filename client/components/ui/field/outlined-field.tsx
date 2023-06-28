import classes from './outlined-field.module.css';

export interface OutlinedFieldProps {
  children: JSX.Element | JSX.Element[]
  containerClassName?: string
  disabledClassName?: string
  error?: string
  disabled?: boolean
}

const OutlinedField = ({children, containerClassName, disabledClassName, error, disabled}: OutlinedFieldProps) => {
  return (
    <>
      <div className={`${classes.container} ${containerClassName} ${disabled === true ? disabledClassName : ""} ${error ? classes.error : ""}`}>
        {children}
      </div>
    </>
  );
}

OutlinedField.defaultProps = {
  containerClassName: "",
  disabledClassName: ""
};

export default OutlinedField;