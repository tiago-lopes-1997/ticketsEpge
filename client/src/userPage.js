import React, {useEffect, useState} from "react";

export default function UserPage() {
    const {backendData, setBackendData} = useState([{}]);


    return(
        <div>
            <h1>Pagina Utilizador reles :D</h1>
            <p>{backendData}</p>
        </div>
    )

    
}