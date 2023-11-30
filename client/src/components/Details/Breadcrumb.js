import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Breadcrumb.css'

function BreadcrumbNav({ params }) {
    return (
        <Breadcrumb className="bread-box">
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to={`/categories/${params.category}`}>{params.category}</Link>
            </li>
            <li  className="breadcrumb-item">
                <Link to={`/categories/${params.category}/${params._id}/details`}>{params.title}</Link>
            </li>
        </Breadcrumb>
    )
}

export default BreadcrumbNav;