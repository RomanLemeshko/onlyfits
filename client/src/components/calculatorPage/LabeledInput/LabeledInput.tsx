const LabeledInput = ({ label, type, value, onChange }) => {
  return (
    <div className="labeledInput">
      <input type={type} value={value} onChange={onChange}/>
      <label>{label}</label>
    </div>
  );
};

export default LabeledInput;
