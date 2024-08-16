import { Link } from "react-router-dom";
import css from '../css/NotFoundPage.module.css'

export default function NotFoundPage() {
    
    return (
        <div className={css.container}>
            <h3>
                Oops! No page was found! Please go to <Link to="/">home page</Link>!
            </h3>
        </div>
    )
}