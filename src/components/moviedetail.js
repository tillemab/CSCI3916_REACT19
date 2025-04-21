import React, { useEffect, useState } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'; // Import useParams
import Review from "../components/review"

const MovieDetail = () => {
  const dispatch = useDispatch();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { movieId } = useParams(); // Get movieId from URL parameters
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading); // Assuming you have a loading state in your reducer
  const error = useSelector(state => state.movie.error); // Assuming you have an error state in your reducer

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  useEffect(() => {
    if (!refresh) { return; }
    dispatch(fetchMovie(movieId));
    setShowReviewForm(false);
    setRefresh(false);
  }, [dispatch, movieId, refresh]);

  const DetailInfo = () => {

    if (loading) {
      return <div>Loading....</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!selectedMovie) {
      return <div>No movie data available.</div>;
    }

    return (
      <Card className="bg-dark text-dark p-4 rounded">
        <Card.Body>
          <Image className="image" src={selectedMovie.imageUrl} thumbnail />
        </Card.Body>
        <ListGroup>
          <ListGroupItem>{selectedMovie.title}</ListGroupItem>
          <ListGroupItem>
            {selectedMovie.actors.map((actor, i) => (
              <p key={i}>
                <b>{actor.actorName}</b> {actor.characterName}
              </p>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              <BsStarFill /> {selectedMovie.avgRating ? selectedMovie.avgRating.toFixed(1) : "Not Rated"}
            </h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body className="card-body bg-white">
          {selectedMovie.movieReviews.map((review, i) => (
            <p key={i}>
              <b>{review.username}</b>&nbsp; {review.review} &nbsp; <BsStarFill />{' '}
              {review.rating}
            </p>
          ))}
        </Card.Body>
        <Card.Body className="card-body bg-white">
            {!showReviewForm && <Button onClick={() => setShowReviewForm(true)}> Review Movie </Button>}
            {showReviewForm && <Review movieId={movieId} setRefresh={setRefresh} />}
        </Card.Body>
      </Card>
    );
  };

  return <DetailInfo />;
};


export default MovieDetail;