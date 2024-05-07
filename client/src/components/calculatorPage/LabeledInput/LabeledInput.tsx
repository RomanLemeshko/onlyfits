const LabeledInput = ({ label, type, value, onChange }: { label: any, type: any, value: any, onChange: any }) => {
  return (
    <div className="labeledInput">
      <input type={type} value={value} onChange={onChange}/>
      <label>{label}</label>
    </div>
  );
};

export default LabeledInput;
