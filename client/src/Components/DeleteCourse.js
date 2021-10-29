import { useContext, useState, useEffect } from 'react';
import { Context } from '../Context';
import { useParams, Redirect, useLocation } from 'react-router-dom';

const DeleteCourse = () => {

    const { id } = useParams();
    const { data, authenticatedUser, validCourseIDs } = useContext(Context);
    const [ course, setCourse ] = useState([]);
    const location = useLocation();
    const { courseUserID } = location.state || 0;

    useEffect(() => {
        data.getCourse(id)
            .then(course => setCourse(course));
    }, [ data, id ]);

    // If course does not exist redirect to "Not Found"
    if (!validCourseIDs.includes(parseInt(id))) {
        return <Redirect to="/notfound" />
    // If user is not owner redirect to "Forbidden"
    } else if (authenticatedUser.id !== courseUserID) {
        return <Redirect to="/forbidden" />
    // If course exists and user is owner delete the course and redirect to course list
    } else {
        data.deleteCourse(id, authenticatedUser.emailAddress, authenticatedUser.password);
        console.log(`Deleted course: ${course}`);
        return (
            <Redirect to="/" />
        );
    }
};

export default DeleteCourse;
