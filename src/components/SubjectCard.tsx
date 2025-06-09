import Link from "./base/Link"

const SubjectCard = ({src, subject_name, subject_id, primary_type, secondary_type}) => (
    <div className="items-center space-x-3 w-64 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 border-radius-100 cursor-pointer inline-flex " onClick={(e)=>window.location.href="/subject/"+subject_id}>
        <img className="w-20 h-20 rounded-l-lg" src={src}></img>
        <div className="w-20">
            <Link href={`/subject/${subject_id}`}>{subject_name}</Link>
        </div>
        {/* <div className="w-20 h-20 dark:bg-gray-700 place-self-end rounded-r-lg flex flex-col justify-center items-center    ">
            <div className="text-lg">{primary_type}</div>
            <div className="text-xs">{secondary_type}</div>
        </div> */}
    </div>
)

export default SubjectCard