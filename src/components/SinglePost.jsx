
const SinglePost = ({ post }) => {

    const { title , description , serialNumber} = post || {}

    return (
        <div className="border shadow-xl p-5">
            <h1 className="text-lg font-bold">{serialNumber} - {title}</h1>
            <p>{description}</p>
        </div>
    );
};

export default SinglePost;