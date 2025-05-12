import Link from "./base/Link"

const TopBar = () => {
    // will totally fix that later
    const version = 'dev 0.1'

    const handleClick = () => {
        alert(`Da Best Quality Personality Database\n\nVersion: ${version}`)
    }

    return <div className="space-x-10 px-4 py-2 bg-gray-300 dark:bg-gray-800">
        <Link href="/subject">Subjects</Link>
        <Link href="/typology">Typologies</Link>
        <Link href="/login">Log in</Link>
        <Link href="#" onClick={handleClick}>About</Link>
    </div>
}

export default TopBar