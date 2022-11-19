import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { addCommentToOneSite, siteDetail, deleteCommentToOneSite } from "../actions/siteActions";
import GoogleMapSite from "../components/GoogleMapSite";

const SiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const siteDetails = useSelector((state) => state.siteDetails);
  const { site } = siteDetails;
  const userLogIn = useSelector((state) => state.userLogIn);
  const { userInfo } = userLogIn
  const [comment, setComment] = useState("")

  const siteAddComment = useSelector((state) => state.siteAddComment)
  const {
    success: successComment,
  } = siteAddComment
  const siteCommentDelete = useSelector((state) => state.siteCommentDelete)
  const {
    success: successCommentDelete,
  } = siteCommentDelete

  useEffect(() => {
    if (successComment) {
      setComment('')
    }
    if (userInfo) {
      dispatch(siteDetail(id));
    } else {
      navigate("/login");
    }
  }, [dispatch, id, comment, navigate, successComment, successCommentDelete, userInfo]);

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    if (!(e.target[0].value === "")) {
      dispatch(
        addCommentToOneSite(id, {
          content: comment,
        })
      );
      alert("successfully comment!");
      navigate(`/sites/${id}`);
    } else {
      alert("The comment is empty!");
    }
  };

  const deleteComment = (commentId) => {
    if ((userInfo._id === site.user || userInfo.isAdmin) && window.confirm("Are you sure?")) {
      dispatch(deleteCommentToOneSite(id, commentId));
    }
  }

  const showImage = async (title, name) => {
    return await fetch(`https://myway-backend.herokuapp.com/api/image/download?url=${name}`).then((res) => {
      return res.blob()
    }).then((blob) => {
      let blobUrl = URL.createObjectURL(blob);
      if (blobUrl) {
        document.getElementById(title).src = blobUrl
      }
    })
  }
  if (site && site.image !== undefined && site.image.split("/")[1] !== "images" ){
    showImage(site.name, site.image)
  }
  
  return (
    <Container className="px-sm-5 mt-5">
      {site && site.image !== undefined ? site.image.split("/")[1] === "images" ? (
        <img
            variant="top"
            src={site.image}
            alt={site.name}
            style={{width: "60vw", display: "block", margin: "0 auto"}}
          />
          
      ) : (
        <img
        variant="top"
        src=""
        id={site.name}
        alt={site.name}
        style={{width: "60vw", display: "block", margin: "0 auto"}}
      />
      ) : (
        <img
        variant="top"
        src={site.image}
        alt={site.name}
        style={{width: "60vw", display: "block", margin: "0 auto"}}
      />
      )}
      <h3 className="mt-5 fw-bold">{site.name}</h3>
      <p className="lh-lg fs-6">{site.description}</p>
      <div className="p-3 my-sm-5 text-sm-center commentContainer">
        <h5 style={{ textAlign: "left" }}>LOCATION</h5>
        {site && site.lat !== undefined && (<GoogleMapSite lat={site.lat} lng={site.lng} />)}
        <h5 className="mt-5 mb-3" style={{ textAlign: "left" }}>
          COMMENTS
        </h5>
        {site.comments === undefined
          ? "No comments."
          : site.comments.map((comment) => (
              <Card key={comment._id} className="mb-1 border-1 d-flex">
                <Card.Body>
                  <Card.Text className="text-start mb-0">
                    {comment.content}
                  </Card.Text>
                  <div className="text-end">{comment.name}</div>
                  {(comment.name === userInfo.name || userInfo.isAdmin) && (
                    <div className="text-end">
                      <Button variant="outline-danger" onClick={() => deleteComment(comment._id)}>delete</Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))}

        <h5 className="mt-5 mb-3">ADD COMMENT</h5>
        <div className="d-flex flex-column justify-content-center">
          <Form onSubmit={commentSubmitHandler}>
            <Form.Group className="mb-3" controlId="comment">
              <Form.Control
                as="textarea"
                placeholder="Comment....."
                rows={8}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <div className="text-end my-1">
              <Button
                type="submit"
                variant="secondary"
                className="btn-round px-3 mx-2"
              >
                POST COMMENT
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default SiteDetail;
