const Input = ({onChange, type, value}) => (
    <input className="
            dark:bg-gray-800
            dark:text-gray-300
            p-1
            mr-2
            rounded-lg
            " type={type} onChange={onChange} value={value}/>
)

export default Input