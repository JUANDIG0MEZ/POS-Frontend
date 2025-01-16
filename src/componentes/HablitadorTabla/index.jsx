

export default function HabilitadorTabla(props){

    return (
        <ul className="flex justify-between gap-5">
            {
                Object.keys(props.isVisible).map((key, index)=>{
                    return <li  
                    key={index} 
                    className={`${props.isVisible[key] ? 'bg-gray-200': 'bg-white'} cursor-pointer py-2 px-2 rounded-xl`} 
                    onClick={()=> {
                        props.setVisible({
                            ...props.isVisible,
                            [key]: !props.isVisible[key]
                        })
                    }}
                    >{key}</li>
                })
               
            }
        </ul>
    )

}