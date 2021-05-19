import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { ROUTES } from './services/routes/myRoutes'
import { Home } from './Home'
import { PostForm } from './PostForm'
import { Navbar } from './Navbar'
import { PostDetails } from './PostDetails'

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />

            <Switch>

                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path={`${ROUTES.createPost}`}>
                    <PostForm />
                </Route>
                <Route path={`${ROUTES.postDetails}/:id`} >
                    <PostDetails />
                </Route>

            </Switch>

        </Router >
    )
}
