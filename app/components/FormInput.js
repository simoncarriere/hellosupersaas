const FormInput = ({ label, errormessage, onChange, id, ...inputProps }) => {
  return (
    <div>
      <input
        className="peer input-field "
        {...inputProps}
        onChange={onChange}
      />
      <p className="hidden text-sm text-red-600 peer-invalid:block peer-invalid:mb-6 peer-invalid:mt-3 ">
        {errormessage}
      </p>
    </div>
  );
};

export default FormInput;
