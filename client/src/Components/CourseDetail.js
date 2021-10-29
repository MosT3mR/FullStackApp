import { useState, useEffect, useContext } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Context } from '../Context';
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
    
    const { id } = useParams();
    const { data, authenticatedUser } = useContext(Context);
    const [ course, setCourse ] = useState({});

    useEffect(() => {
        data.getCourse(id)
            .then(course => setCourse(course));
    }, [ data, id ]);
        
    if (course === null) {
        return <Redirect to="/notfound" />
    } else {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {/* "Update" and "Delete" only appear if user is course owner */
                        authenticatedUser && authenticatedUser.id === course.userId ?
                            <>
                            <Link className="button" to={{
                                pathname: `/courses/${id}/update`,
                                state: {
                                    courseUserID: course.userId
                                }}}>Update Course</Link>
                            <Link className="button" to={{
                                pathname: `/courses/${id}/delete`,
                                state: {
                                    courseUserID: course.userId
                                }}}>Delete Course</Link>
                            </>
                            : null } 
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
                
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                
                                <p>
                                {course.user ? 
                                    (`By ${course.user.firstName} ${course.user.lastName}`)
                                    : null }
                                </p>
                                
                                <ReactMarkdown>{course.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
};

export default CourseDetail;