import { ROUTES } from "../routes/AppRoutes"

const Home = () => {
    return (
        <div id="homepage">
            <h1 className="text-3xl font-bold underline">welcome to city 17</h1>
            <a href={ROUTES.SUBJECT}>Subjects</a>
        </div>
    )
}

export default Home