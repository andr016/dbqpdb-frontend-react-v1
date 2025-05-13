import Link from "./base/Link"

const SubjectCard = ({src, subject_name, subject_id}) => (
    <div className="items-center space-x-3 w-56 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 border-radius-100 cursor-pointer inline-flex " onClick={(e)=>window.location.href="/subject/"+subject_id}>
        <img className="w-20 h-20 rounded-l-lg" src={src}></img>
        <Link href={`/subject/${subject_id}`}>{subject_name}</Link>
    </div>
)

export default SubjectCard