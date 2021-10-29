import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams, Redirect, useLocation } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';

const UpdateCourse = () => {
    
    const { id } = useParams();
    let history = useHistory();
    let { data, authenticatedUser, validCourseIDs } = useContext(Context);
    const [ course, setCourse ] = useState({});
    const location = useLocation();
    const { courseUserID } = location.state || 0;

    useEffect(() => {
        data.getCourse(id)
            .then(course => setCourse(course));
    }, [ data, id ]);

    // Handler for changes in form inputs updates state
    const change = (event) => {
        setCourse( prevValues => ({ 
            ...prevValues, 
            [event.target.name]: event.target.value 
        }));
    };

    // Handler for form submit button updates the course object
    const submit = () => {
        data.updateCourse(id, course, authenticatedUser.emailAddress, authenticatedUser.password)
            .then( errors => {
                if (errors.length) {
                    console.log(errors);
                    setCourse({errors});
                } else {
                   history.push(`/courses/${id}`);
                }
            }).catch( err => {
                console.log(err);
                history.push('/error');
            });
    };

    // Handler for form cancel button returns to "Course Detail" page
    const cancel = () => {
        history.push(`/courses/${id}`);
    };
console.log(validCourseIDs);    
    // If the course is an empty object, redirect to "Not Found"
    if (!validCourseIDs.includes(parseInt(id))) {
        return <Redirect to="/notfound" />;
    // If the user is not the course owner, redirect to "Forbidden"
    } else if (authenticatedUser.id !== courseUserID) {
        return <Redirect to="/forbidden" />;
    // If course exists and user is owner, render the prepopulated form
    } else {
        return (
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    <Form
                        cancel={cancel}
                        errors={course.errors}
                        submit={submit}
                        submitButtonText="Update Course"
                        elements={ () => (
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="title">Course Title</label>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        defaultValue={course.title} 
                                        onChange={change} />

                                    <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>

                                    <label htmlFor="description">Course Description</label>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        defaultValue={course.description} 
                                        onChange={change} />
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input 
                                        id="estimatedTime" 
                                        name="estimatedTime" 
                                        type="text" 
                                        defaultValue={course.estimatedTime} 
                                        onChange={change} />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea 
                                        id="materialsNeeded" 
                                        name="materialsNeeded" 
                                        defaultValue={course.materialsNeeded} 
                                        onChange={change} />
                                </div>
                            </div>
                        )} />
                </div>
            </main>
        );
    }
}

export default UpdateCourse;
