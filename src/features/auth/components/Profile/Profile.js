import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../authSlice"

const Profile = () => {
    const user = useSelector(selectCurrentUser)

    const welcome = user ? `Welcome ${user.fullName}!` : 'Welcome!'

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </section>
    )

    return content
}
export default Profile