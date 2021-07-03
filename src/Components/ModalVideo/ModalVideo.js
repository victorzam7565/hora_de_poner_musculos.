import { useState, useEffect } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";
import "./modalvideo.scss";
const ModalVideo = ({ videoKey, videoPlatform, isOpen, close }) => {
  const [urlVideo, setUrlVideo] = useState(null);

  useEffect(() => {
    switch (videoPlatform) {
      case "YouTube":
        setUrlVideo(`https://youtu.be/${videoKey}`);
        break;
      case "Vimeo":
        setUrlVideo(`https://vimeo.com/${videoKey}`);
        break;
    }
  }, [videoKey, videoPlatform]);

  return (
    <Modal
      className="modal-video"
      centered
      footer={false}
      visible={isOpen}
      onCancel={close}
    >
      <ReactPlayer url={urlVideo} controls />
    </Modal>
  );
};

export default ModalVideo;