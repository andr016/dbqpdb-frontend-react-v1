const Link = ({href, onClick, children}) => (
    <a className="text-blue-600 hover:text-blue-400" href={href} onClick={onClick}>{children}</a>
)

export default Link