import { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { RiDeviceRecoverFill } from 'react-icons/ri';
import { activateSell } from '../../services/productData';
import { GoLocation } from 'react-icons/go';

function DisabledCard({ params, history }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        activateSell(params._id)
            .then(res => {
                history.push(`/categories/${params.category}/${params._id}/details`)
                setShow(false);
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="disabled-card">
            <Card className='adde1'>
                <div className='image-box1'>
                    <Card.Img className='image-box-internal' variant="top" src={params.image} />
                </div>
                <Card.Body>
                    <Card.Title>{params.title}</Card.Title>
                    <Card.Text>Posted Price: {params.price}$</Card.Text>
                    { params.saleFlag ? <Card.Text >Sold Price : {params.salePrice}$</Card.Text> : <Card.Text >Not yet Sold <span id="enableIcon" onClick={handleShow} style={{marginLeft : "45px", color:"green"}}>Make Active <RiDeviceRecoverFill /> </span></Card.Text>  }

                    {/* { params.saleF40pxlag ? null :<span id="enableIcon" onClick={handleShow}><RiDeviceRecoverFill /></span> }   */}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        <div className='location1'>
                            <GoLocation />{"  "}
                            {params.city}
                        </div>
                    </small>
                </Card.Footer>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to make this item active?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    By clicking <strong>Make Active</strong>, this sell will change
                    it's status to <strong>Active</strong>,
                    which means that everyone on this Web site will see it.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Make Active
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DisabledCard;