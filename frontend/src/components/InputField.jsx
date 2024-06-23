export default function InputField({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col py-2">
        <label htmlFor="label" className="w-full text-sm font-medium text-left py-2">{label}</label>
        <input type={type} id={label} placeholder={placeholder} className="w-full px-2 py-1 border" value={value} onChange={onChange} />
    </div>
  )
}
