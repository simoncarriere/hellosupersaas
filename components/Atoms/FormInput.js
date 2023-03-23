const FormInput = ({ label, errormessage, onChange, id, ...inputProps }) => {
  return (
    <div>
      <input
        className="my-2 peer input-field"
        {...inputProps}
        onChange={onChange}
      />
      <p className="hidden my-2 text-xs text-red-600 peer-invalid:block">
        {errormessage}
      </p>
    </div>
  );
};

export default FormInput;

{
  /* <label htmlFor="email" className="sr-only">
                          Email
                        </label> */
}
