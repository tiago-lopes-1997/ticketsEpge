import React, {useEffect, useState} from "react";

export default function FuncPage() {
    const {backendData, setBackendData} = useState([{}]);

    useEffect(() => {
        fetch("/api/login").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
            }
        )
    })

    return(
        <div>
            <h1>Pagina Funcionario</h1>
            <p>{backendData}</p>
        </div>
    )

    
}
