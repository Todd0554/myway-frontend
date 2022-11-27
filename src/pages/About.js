import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { allSites } from "../actions/siteActions";
import { useDispatch, useSelector } from "react-redux";

const About = () => {
  const dispatch = useDispatch();
  // get sites list state from store
  const sitesList = useSelector((state) => state.sitesList);
  const { sites } = sitesList;
  //get login user state from store
  const userLogIn = useSelector((state) => state.userLogIn);
  const { userInfo } = userLogIn;

  const selectFiveSites = sites.slice(sites.length - 5, 6);

  // get all the sites info
  useEffect(() => {
    dispatch(allSites());
    // eslint-disable-next-line
  }, [dispatch]);

  const imageShow = () => {
    sites.map((site) => {
      if (site.image.split("/")[1] !== "images") {
        showImage(site.name, site.image);
      }
    });
  };

  const showImage = async (title, name) => {
    return await fetch(
      `https://myway-backend.herokuapp.com/api/image/download?url=${name}`
    )
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        let blobUrl = URL.createObjectURL(blob);
        if (blobUrl) {
          document.getElementById(title).src = blobUrl;
        }
      });
  };
  if (
    sites &&
    sites.length !== 0 &&
    sites[sites.length - 1].image !== undefined &&
    sites[sites.length - 1].image.split("/")[1] !== "images"
  ) {
    imageShow();
  }
  return (
    <>
      <Carousel>
        {selectFiveSites.map((site, id) => (
          <Carousel.Item key={id}>
            <Carousel.Caption>
              <h1 className="fw-bold mb-5">{site.name}</h1>
            </Carousel.Caption>
            <Link to={`/sites/${site._id}`}>
              {site.image.slice("/")[1] === "image" ? (
                <img
                  className="d-block w-100"
                  style={{ height: "58vh", objectFit: "cover" }}
                  src={site.image}
                  alt={site.name}
                />
              ) : (
                <img
                  className="d-block w-100"
                  style={{ height: "58vh", objectFit: "cover" }}
                  src={site.image}
                  id={site.name}
                  alt={site.name}
                />
              )}
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container>
        <h2 className="text-center m-5">
          <Badge bg="secondary">ABOUT US</Badge>
        </h2>
        <Row className="d-flex align-items-center">
          <Col md="auto">
            <img
              className="imgTop mx-auto d-block"
              src="https://images.unsplash.com/photo-1515861461225-1488dfdaf0a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="top"
            />
          </Col>
          <Col className="text-center">
            <p>
              We help travelers find the best destinations in Australia. Let's
              make it your best Australia trip.
            </p>
            <Link to="/register">
              <Button
                variant="info"
                className="btn-round px-4"
                id="aboutP-signup"
              >
                Let's start!
              </Button>
            </Link>
          </Col>
        </Row>

        <h2 className="text-center mt-5">FEATURES</h2>
        <Row className="d-flex align-items-center">
          {/* Find Your Way */}
          <Col className="col-md-6">
            <Card className="text-center p-4 m-3">
              <i className="fa-solid fa-map-location-dot fa-5x mx-auto d-block"></i>
              <Card.Body>
                <Card.Text>
                  Are you wondering where to travel? Here you will find a list
                  of recommended travel destinations by category. You are sure
                  to find the place you want to visit.
                </Card.Text>
                <Link to="/sites">
                  <Button
                    variant="primary"
                    className="btn-round px-4"
                    id="aboutP-sites"
                  >
                    Find Your Way
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Blog */}
          <Col>
            <Card className="text-center p-4 m-3">
              <i className="fa-solid fa-camera-retro fa-5x mx-auto d-block"></i>
              <Card.Body>
                <Card.Text>
                  Why not write a travel blog and share it with others or keep
                  it as a memory for yourself? You may also find places you want
                  to visit in other people's travel blogs.
                </Card.Text>
                {userInfo ? (
                  <Link to="/blogs">
                    <Button
                      variant="primary"
                      className="btn-round px-4"
                      id="aboutP-blog"
                    >
                      Visit Blog Page
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button
                      variant="primary"
                      className="btn-round px-4"
                      id="aboutP-login"
                    >
                      Login Now
                    </Button>
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
