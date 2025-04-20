import React, { useState } from 'react';
import { submitReview } from '../actions/reviewActions';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

function Review(props) {
    const [details, setDetails] = useState({
        movieId: props.movieId,
        rating: 0,
        review: ''
    });

    const dispatch = useDispatch();

    const updateDetails = (event) => {
        setDetails({
          ...details,
            [event.target.id]: event.target.value
        });
    };

    const review = () => {
        dispatch(submitReview(details));
        props.setRefresh(true);
    };

    return (
        <div className="review-container">
            <Form className='review-form bg-dark text-light p-4 rounded'>
                <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control 
                        onChange={(e) => {
                            if (Number(e.target.value) >= 0 && Number(e.target.value) <= 5) {
                                e.target.value = Number(e.target.value);
                            } else if (e.target.value === "") {
                                e.target.value = "";
                            }
                            updateDetails(e)
                        }} 
                        onBlur={(e) => {
                            if(isNaN(e.target.value)) {
                                e.target.value = 0
                            }
                            e.target.value = Math.min(5, Math.max(0, Number(e.target.value)));
                            updateDetails(e)
                        }}  
                        value={details.rating} 
                        autoComplete="username"
                        type="rating"
                        placeholder="Rating (0-5)"
                    />
                </Form.Group>

                <Form.Group controlId="review">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control 
                        onChange={updateDetails}
                        value={details.review}
                        autoComplete="comment"
                        type="review"
                        placeholder="Comment" 
                    />
                </Form.Group>
                <Button onClick={review}>Submit Review</Button>
            </Form>
        </div>
    );
}

export default Review;