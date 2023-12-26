import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { addVideoToHistoryAPI, removeVideoAPI } from "../services/allAPI";

function VideoCard({video,setDeleteVideoResponse,insideCategory}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {setShow(true)
    // Generte data to store in history
    const {caption,link} = video
    let today = new Date()
    let timeStamp = new Intl.DateTimeFormat('en-US',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today)
    let videoHistory = {caption,link,timeStamp}
    // Make API call
    await addVideoToHistoryAPI(videoHistory)
  };

  const removeVideo = async (id) =>{
    await removeVideoAPI(id)
    setDeleteVideoResponse(true)
  }

  const dragStarted = (e,id) =>{
    console.log("Drag started... Video ID:"+id);
    e.dataTransfer.setData("videoId",id)
  }
  return (
    <>
      <Card draggable onDragStart={e=>dragStarted(e,video?.id)}>
        <Card.Img
          onClick={handleShow}
          height={"300px"}
          variant="top"
          src={video?.url}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <h6>{video?.caption}</h6>
            {insideCategory?null:<button className="btn" onClick={()=>removeVideo(video?.id)}>
              <i className="fa-solid fa-trash text-danger"></i>
            </button>}
          </Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{video?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
          className="w-100"
            width="1020"
            height="574"
            src={`${video?.link}?autoplay=1`}
            title={video?.caption}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default VideoCard;
