import React from 'react'
import { auth, provider } from './config/configGoogle'
import { signInWithPopup } from "firebase/auth"
import { useState } from 'react'
import { database } from './config/configGoogle'
import { ref, set, update } from "firebase/database";
import UserDahboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import Logo from './google-color.svg'

export function Login() {
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    const signinwithgoogle = () => {
        signInWithPopup(auth, provider)
            .then((account) => {
                setUser("welcome  " + account.user.displayName)
                //if admin load admin dashboard
                //if not admin  load user dashboard
                setUser(account.user.displayName);
                if (account.user.email == "arun.cs21@bitsathy.ac.in")
                    setAdmin(true)
                else {
                    writedatabase(account.user.displayName, account.user.email);

                }

            })
    }
    function writedatabase(name, email) {
        function WriteUserdata(name, email) {
            set(ref(database, "users/" + name),
                {
                    email: email,
                    dept: "",
                    gyear: "",
                    name: name
                })
        }
        WriteUserdata(name, email)
    }
    return (
        <>
            {isAdmin && <AdminDashboard />}
            {!isAdmin && user == null &&
               <>
               
               <h1 style={{fontWeight:"bold",textAlign:"center"}}>College Leaving Certificate Applying Portal</h1>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                        <h3 style={{marginTop:"250px"}}>SIGN IN TO CONTINUE</h3>
                        <button onClick={signinwithgoogle} className='loginButton' style={{position:"absolute",top:"50%", display:"flex", alignItems:"center", cursor:"pointer", background:"#00043B", border:"0",padding:"1px", borderRadius:"10px"}}>
                            <img style={{ width: "30px",padding:"10px", background:"white", borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px" }} src={Logo} alt="google logo"></img>
                            <p style={{padding:"0 30px", color:"white",fontSize:"16px"}}>Google Sign in </p>
                        </button>
                    </div>
                </>}
            {!isAdmin && user != null && <UserDahboard username={user} />}
        </>
    )
}
