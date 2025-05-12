const Input = ({onChange, type}) => (
    <input className="
            dark:bg-gray-800
            dark:text-gray-300
            p-1
            mr-2
            rounded-lg
            " type={type} onChange={onChange}/>
)

export default Input