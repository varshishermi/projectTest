import { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Image, OverlayTrigger , Tooltip} from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { wishProduct } from '../../../services/productData'

function ProductInfo({ params }) {
    const [wish, setWish] = useState(false);

    useEffect(() => {
        if (params.isWished === true) {
            setWish(true)
        } else {
            setWish(false)
        }
    }, [params.isWished, setWish])

    const onHearthClick = () => {
        if (wish === false) {
            wishProduct(params._id)
                .then(res => {
                    setWish(true);
                })
                .catch(err => console.log(err))
        } else {
            wishProduct(params._id)
                .then(res => {
                    setWish(false);
                })
                .catch(err => console.log(err))
        }
    }
    const discount_percent = ((params.originalPrice - params.price)/params.originalPrice) * 100 ;
    const price = params.price
    // const valhere=""
    function getAddress2(param){
        if(param===undefined){
            return ""
        }
        else{
            return param
        }
    }
    return (
        <>
            <div className='image-box'>
                <Image className="col-lg-12" src={params.image} rounded />
            </div>
            <Row>
                <div className='col-lg-10'>
                    <h1 className="col-lg-10 col-sm-10 product-info-heading">{params.title}</h1>
                <Row className='content-loc1'>
                    <Col md={2} className="main-price">
                        {(discount_percent===0)?
                        <>
                            <div>
                                {"$"}{params.price===undefined?(params.price):(params.price).toFixed(2)}
                            </div>
                            <div className='org-price-content-blanker'>
                                {"$"}{params.originalPrice===undefined?(params.originalPrice):(params.originalPrice).toFixed(2)}
                            </div>
                        </>:
                        <>
                            <div>
                                {"$"}{params.price===undefined?(params.price):(params.price).toFixed(2)}
                            </div>
                            <div className='org-price-content'>
                                {"$"}{params.originalPrice===undefined?(params.originalPrice):(params.originalPrice).toFixed(2)}
                            </div>
                        </>
                        }
                    </Col>
                    <Col md={3}>
                        {(discount_percent===0)?
                        <>
                            <div className='discount-box1-more'>
                                {(discount_percent).toFixed(2)} {"% off"}
                            </div>
                        </>:
                        <>
                            <div className='discount-box1'>
                                {(discount_percent).toFixed(2)} {"% off"}
                            </div>
                        </>
                        }
                        {/* <div className='discount-box1'>
                            {(discount_percent).toFixed(2)} {"% off"}
                        </div> */}
                    </Col>
                    <Col md={5} className='price-point1'>
                        {params.flexibility==="Fixed"?
                        <div className='fxd-prc'>Fixed</div>
                        :
                        <div className='ngo-prc'>Negotiable</div>
                        }
                    </Col>
                </Row>

                
                </div>

                <div className='col-lg-2'>
                <span id="heartIconDetails" className="col-lg-1 col-sm-1" onClick={onHearthClick}>
                {params.isAuth && <>
                    {!wish ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>Add to Wishlist</Tooltip>}>
                            <BsHeart />
                        </OverlayTrigger>
                    )
                        : (
                            <OverlayTrigger placement="top" overlay={<Tooltip>Remove from Wishlist</Tooltip>}>
                                <BsHeartFill />
                            </OverlayTrigger>
                        )
                    }
                </>}
                </span>
                </div>
            </Row>
            <div id="detailsCardText" className="col-lg-12">
                <Tabs defaultActiveKey="details" transition={false}>
                    <Tab className='add' eventKey="details" title="Details" id="tab-details">
                        <p style={{fontWeight:"bolder"}}>
                            Qty : {params.quantity}
                        </p>
                        <p style={{fontWeight:"bolder"}}>
                            <span>Price Per Unit :{"$"}{(params.price===undefined || params.quantity===undefined)?(params.price/params.quantity):(params.price/params.quantity).toFixed(2)}</span>
                        </p>
                        <div className='desc-box'>
                            <p>
                            {params.description}
                            </p>
                        </div>
                        <hr />
                        <p id="details-footer" className="text-muted">Product listed at {params.addedAt}</p>
                    </Tab>
                    
                    <Tab eventKey="details1" title="Store Address" id="tab-details">
                        {params.address1+" "+getAddress2(params.address2)+" "+params.city+" "+params.stateName+" "+params.zipcode}
                        <hr />
                        <p id="details-footer" className="text-muted">Product listedhvh at {params.addedAt}</p>
                    </Tab>
                    {/* <Tab eventKey="aboutSeller" title="About seller">
                        <p>Name: {params.name || "Not specified"}</p>
                        <p>Email: {params.email}</p>
                        <p>Telephone: {params.phone}</p>
                        <p>City: {params.city}</p>
                    </Tab> */}
                </Tabs>
            </div>
        </>
    )
}

export default ProductInfo;