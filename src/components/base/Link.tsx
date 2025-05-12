const Link = ({href, onClick, children}) => (
    <a className="text-blue-600 hover:text-blue-400 dark:text-gray-100 dark:hover:text-gray-300" href={href} onClick={onClick}>{children}</a>
)

export default Link